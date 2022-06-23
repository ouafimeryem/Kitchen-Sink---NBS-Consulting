import { LightningElement } from 'lwc';

export default class SearchFeed extends LightningElement {

    isModalOpen = false;
    
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
   
    getKey(event){
        console.log(event.target.value);
        const event2 = new CustomEvent('child', {
            // detail contains only primitives
            detail: event.target.value
            });
            this.dispatchEvent(event2);

       
    }
}