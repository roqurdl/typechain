import crypto from "crypto";

interface BlockShape {
  hash: string;
  prehash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prehash: String,
    public height: Number,
    public data: String
  ) {
    this.hash = Block.calculateHash(prehash, height, data);
  }
  static calculateHash(prehash: String, height: Number, data: String) {
    const toHash = `${prehash}${height}${data}`;
  }
}
