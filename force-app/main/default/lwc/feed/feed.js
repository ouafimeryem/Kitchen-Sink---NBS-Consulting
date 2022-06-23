import { LightningElement, track } from 'lwc';

export default class Feed extends LightningElement {
    keyword
    haldleChild(event){
        
        this.keyword=event.detail;
        console.log(this.keyword);
        }

}