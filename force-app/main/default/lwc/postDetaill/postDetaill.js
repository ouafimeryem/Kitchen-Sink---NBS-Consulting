import { LightningElement,api ,wire} from 'lwc';
import getPost from '@salesforce/apex/PostContr.getPost';
import Id from '@salesforce/user/Id';
export default class PostDetaill extends LightningElement {
  @api recordId;
  
  async connectedCallback() {
  res  ;
    console.log('ok ;'+this.recordId);
      
    this.res=await getPost({
      key : this.recordId
    });
    console.log(this.res);
  }
    
  
  
  }