import { LightningElement ,api} from 'lwc';
import getVotePost from '@salesforce/apex/PostContr.getVotePost';
import inlikePost from '@salesforce/apex/PostContr.inlikePost';
import likePost from '@salesforce/apex/PostContr.likePost';
import { NavigationMixin } from 'lightning/navigation';

export default class UpVote extends LightningElement {
@api recordId

n
like
likenon
msg
    async renderedCallback(){
        console.log('in async')
        this.n=await getVotePost({keyword2 : this.recordId});
       if(this.n > 0){this.like=true;this.likenon=false;this.msg='liked';}
       else{this.like=false;this.likenon=true;this.msg='like';}
       console.log('out async');
       
    
    }
  
    async inliker(){
        
        this.msg='like';
        this.like=false;
        this.likenon=true;
        await inlikePost({keyword2 : this.recordId});
        eval("$A.get('e.force:refreshView').fire();");


    }
    async liker(){
        
        this.msg='liked';
        this.like=true;
        this.liknon=false;
        await likePost({keyword2 : this.recordId});this.navigateToRecordPage;
        eval("$A.get('e.force:refreshView').fire();")


    }
}