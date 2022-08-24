import crypto from "crypto";
import { BlockList } from "net";

interface BlockShape {
  hash: string;
  preHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public readonly preHash: string,
    public readonly height: number,
    public readonly data: string
  ) {
    this.hash = Block.calculateHash(preHash, height, data);
  }
  static calculateHash(preHash: string, height: number, data: string) {
    const toHash = `${preHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPreHash() {
    if (this.blocks.length === 0) {
      return "";
    } else {
      return this.blocks[this.blocks.length - 1].hash;
    }
  }
  public addBlock(data: string) {
    const newBlock = new Block(this.getPreHash(), this.blocks.length + 1, data);
    return this.blocks.push(newBlock);
  }
  public spownBlocks(): readonly Block[] {
    return [...this.blocks];
  }
}
const blockchain = new BlockChain();

blockchain.addBlock("b1");
blockchain.addBlock("b2");
blockchain.addBlock("b3");
blockchain.addBlock("b4");

console.log(blockchain.spownBlocks());
