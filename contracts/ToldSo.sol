// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ToldSo is Initializable {
    struct Post {
        string title;
        string body;
        string media;
        uint256 timestamp;
    }

    mapping(address => Post[]) private _userToPosts;

    event PostCreated(address indexed author, Post post);
    event PostUpdated(address indexed author, Post post);

    function createPost(
        string memory title,
        string memory body,
        string memory media
    ) external {
        Post memory post = Post(title, body, media, block.timestamp);
        _userToPosts[msg.sender].push(post);
        emit PostCreated(msg.sender, post);
    }

    /// @notice Allow updates in a 30 minute window
    function updatePost(
        uint256 idx,
        string memory title,
        string memory body,
        string memory media
    ) external {
        require(
            idx < _userToPosts[msg.sender].length,
            "ToldSo: Post does not exist"
        );
        uint256 timestamp = _userToPosts[msg.sender][idx].timestamp;
        require(
            block.timestamp - timestamp < 30 minutes,
            "ToldSo: Post is too old to update"
        );
        Post memory post = Post(title, body, media, timestamp);
        _userToPosts[msg.sender][idx] = post;
        emit PostUpdated(msg.sender, post);
    }

    function getPosts(address user) external view returns (Post[] memory) {
        return _userToPosts[user];
    }
}
