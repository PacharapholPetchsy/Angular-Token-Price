import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { default as pancakeswapABI } from "../../assets/ABI/pancakeswapABI.json";
import { default as safemoonABI } from "../../assets/ABI/safemoonABI.json";

@Component({
  selector: 'app-get-token-price',
  templateUrl: './get-token-price.component.html',
  styleUrls: ['./get-token-price.component.scss']
})
export class GetTokenPriceComponent implements OnInit {

  // Addresses
  private BSCScan = "https://bsc-dataseed1.binance.org";
  private web3 = new Web3(this.BSCScan);
  private pancakeSwapContract = "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase();
  private BNBContract = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  private USDTContract = "0x55d398326f99059fF775485246999027B3197955";
  private burnWallet = "0x0000000000000000000000000000000000000001"; // May need to change this depending on the null address
  private address = "0x42981d0bfbAf196529376EE702F2a9Eb9092fcB5"; // Change this to get the token you want

  // Token Related Values
  currentPrice = '0';
  currentBurn = '0';

  constructor() { }

  ngOnInit(): void {
    this.findPrice();
    this.findBurn();
  }

  async calculatePrice(weiConvert, tokenAddress1, tokenAddress2){
    var amountOut;
    try {
      var router = await new this.web3.eth.Contract(pancakeswapABI as AbiItem[], this.pancakeSwapContract);
      amountOut = await router.methods.getAmountsOut(weiConvert, [tokenAddress1, tokenAddress2]).call();
      amountOut = this.web3.utils.fromWei(amountOut[1]);
    } catch (error) {}
    if(!amountOut) return 0;
    return amountOut;
  }

  setDecimals(number, decimals){
    number = number.toString();
    var numberAbs = number.split('.')[0]
    var numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while(numberDecimals.length < decimals){
      numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
  }

  async findPrice() {
    var bnbPrice = await this.calculatePrice(this.web3.utils.toWei("1", "ether"), this.BNBContract, this.USDTContract);
    var tokens_to_sell = 1; // Change this value to get the price of x amount of coins
    var tokenContract = await new this.web3.eth.Contract(safemoonABI as AbiItem[], this.address);
    var priceInBnb = await this.calculatePrice(this.setDecimals(tokens_to_sell, await tokenContract.methods.decimals().call()), this.address, this.BNBContract);
    this.currentPrice = this.unscientific(priceInBnb*bnbPrice);
  }

  async findBurn() {
    var tokenContract = await new this.web3.eth.Contract(safemoonABI as AbiItem[], this.address);
    var tokenBurn = await tokenContract.methods.balanceOf(this.burnWallet).call();
    this.currentBurn = tokenBurn.slice(0,2) + "." + tokenBurn.slice(2,4) + "%";
  }

  unscientific(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }
}
