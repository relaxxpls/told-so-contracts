import type { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  await deployments.deploy("Told", {
    from: deployer,
    log: true,
  });
};

export default func;

func.tags = ["Told"];
