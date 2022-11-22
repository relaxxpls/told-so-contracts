import { expect } from "chai";
import { network, ethers, deployments, getNamedAccounts } from "hardhat";

import type { ToldSo } from "../types";

describe("ToldSo", () => {
  let toldSo: ToldSo;
  let deployer: string;
  let alice: string;

  before(async () => {
    ({ deployer, alice } = await getNamedAccounts());
    await deployments.fixture(["ToldSo"]);
    toldSo = await ethers.getContract("ToldSo", deployer);
  });

  describe("Create and Read posts", () => {
    it("Alice should not have any posts initially", () =>
      expect(toldSo.getPosts(alice)).to.eventually.have.lengthOf(0));

    it("Should allow Alice to create a post", async () => {
      const tx = await toldSo
        .connect(await ethers.getSigner(alice))
        .createPost("Hello World", "", "");
      await tx.wait();
      expect(tx).to.emit(toldSo, "PostCreated");
    });

    it("Should be able to read Alice's post now", async () => {
      const posts = await toldSo.getPosts(alice);
      expect(posts).to.have.lengthOf(1);
      expect(posts[0].title).to.equal("Hello World");
      expect(posts[0].body).to.equal("");
    });

    it("Should allow Alice to update her post immediately", async () => {
      const tx = await toldSo
        .connect(await ethers.getSigner(alice))
        .updatePost(0, "Hello World", "I am Alice", "");
      await tx.wait();
      expect(tx).to.emit(toldSo, "PostUpdated");
    });

    it("Should prevent Alice from late updates", async () => {
      await network.provider.send("evm_increaseTime", [86400]);
      await network.provider.send("evm_mine", []);
      await expect(
        toldSo
          .connect(await ethers.getSigner(alice))
          .updatePost(0, "Hello World", "I am Alice", "")
      ).to.be.revertedWith("ToldSo: Post is too old to update");
    });

    it("Should prevent Alice from updating non existing posts", async () => {
      await expect(
        toldSo
          .connect(await ethers.getSigner(alice))
          .updatePost(1, "Hello World", "I am Alice", "")
      ).to.be.revertedWith("ToldSo: Post does not exist");
    });
  });
});
