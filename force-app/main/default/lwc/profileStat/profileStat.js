import { LightningElement,api } from 'lwc';
import getCommentsCount from '@salesforce/apex/PostContr.getCommentsCount';
import getLikeCount from '@salesforce/apex/PostContr.getLikeCount';
import getpostsCount from '@salesforce/apex/PostContr.getpostsCount';
import getreputation from '@salesforce/apex/PostContr.getreputation';
import getbadges from '@salesforce/apex/PostContr.getbadges';

export default class ProfileStat extends LightningElement {
@api recordId
likes
comments
reputation
posts
badges
async renderedCallback(){

    this.likes=await getLikeCount({keyword : this.recordId});
    this.comments=await getCommentsCount({keyword : this.recordId});
    this.posts=await getpostsCount({keyword : this.recordId});
    this.reputation = await getreputation({keyword : this.recordId});
    this.badges = await getbadges({keyword : this.recordId})
}
}