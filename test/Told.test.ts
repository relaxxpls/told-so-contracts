import { expect } from "chai";
import { network, ethers, deployments, getNamedAccounts } from "hardhat";

import type { Told } from "../types";

// import chai from 'chai';
// import chaiString from 'chai-string';

// chai.use(chaiString);
// chai.should();

describe("Told", () => {
  let told: Told;
  let deployer: string;
  let alice: string;
  let bob: string;

  before(async () => {
    ({ deployer, alice, bob } = await getNamedAccounts());
    await deployments.fixture(["v1_FlappyMusk"]);
    flappyMusk = await ethers.getContract("v1_FlappyMusk", deployer);
    TournamentFactory = await ethers.getContractFactory(
      "contracts/v1/Tournament.sol:Tournament"
    );
  });

  describe("Create and Read posts", () => {
    it("Alice should not have any posts initially", async function () {
      // const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
      //   deployOneYearLockFixture
      // );
      // await time.increaseTo(unlockTime);
      // await expect(lock.withdraw()).to.changeEtherBalances(
      //   [owner, lock],
      //   [lockedAmount, -lockedAmount]
      // );
    });

    it("Should allow Alice to create a post", async function () {
      // const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
      //   deployOneYearLockFixture
      // );
      // await time.increaseTo(unlockTime);
      // await expect(lock.withdraw()).to.changeEtherBalances(
      //   [owner, lock],
      //   [lockedAmount, -lockedAmount]
      // );
    });

    it("Should be able to read Alice's post now", async function () {
      //
    });

    //   it("Should set the right owner", async function () {
    //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);
    //     expect(await lock.owner()).to.equal(owner.address);
    //   });
    //   it("Should receive and store the funds to lock", async function () {
    //     const { lock, lockedAmount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );
    //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
    //       lockedAmount
    //     );
    //   });
    //   it("Should fail if the unlockTime is not in the future", async function () {
    //     // We don't use the fixture here because we want a different deployment
    //     const latestTime = await time.latest();
    //     const Lock = await ethers.getContractFactory("Lock");
    //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //       "Unlock time should be in the future"
    //     );
    //   });
  });
});
