// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Told {
    struct Post {
        string title;
        string body;
        uint256 timestamp;
    }

    mapping(address => Post[]) private _userToPost;

    function createPost(string memory title, string memory content) external {
        Post memory post = Post(title, content, block.timestamp);
        _userToPost[msg.sender].push(post);
    }

    function getPosts(address user) external view returns (Post[] memory) {
        return _userToPost[user];
    }
}
