import { api, LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getPost from '@salesforce/apex/PostContr.getPost';
import solutionImg from '@salesforce/resourceUrl/solution';
import questionImg from '@salesforce/resourceUrl/question';
import articleImg from '@salesforce/resourceUrl/article';
import TickerSymbol from '@salesforce/schema/Account.TickerSymbol';


export default class FeedItem extends NavigationMixin(LightningElement){
    detail={}
    orderBy='rank__c';
    postss =[]
    posts =[]
    postTest =[]
solution=solutionImg
question=questionImg
article=articleImg
post='P-0'

async renderedCallback(){  
    if(this.post==='P-0'){
    console.log(this.post);
    this.postss = await getPost({keyword : this.post,keyword2 : this.orderBy});
    this.posts=this.postss[0];
    console.log(this.posts);
    this.posts.forEach(p => {
        
        if(p.Type__c === 'Question'){p.img__c=this.question;}
        if(p.Type__c === 'Article'){p.img__c=this.article;}
        if(p.Type__c === 'Implementation'){p.img__c=this.solution;}

    })
    if(this.detail != null ){
    if(this.detail.tous==true){ this.posts=this.postss[0];}
    if(this.detail.articles==true){this.posts=this.postss[0].filter(po => po.Type__c === 'Article');}
    if(this.detail.challenges==true){this.posts=this.postss[0].filter(po => po.Type__c === 'Question');}
    if(this.detail.solutions==true){this.posts=this.postss[0].filter(po => po.Type__c === 'Implementation');}}
}
    }

    async haldleChild(event){
        this.detail=event.detail;
        console.log(' in parent event :'+this.detail);
        this.post=this.detail.key;
        if(this.detail.classes==true){this.orderBy='rank__c';}
        if(this.detail.likes==true){this.orderBy='LikeCount__c';}
        if(this.detail.actifs==true){this.orderBy='CommentCount__c';}
        if(this.detail.recents==true){this.orderBy='Created_Date__c';}

        if(this.post==='' || this.post==null){           
            this.postss = await getPost({keyword : 'P-0',keyword2 : this.orderBy});
            this.posts=this.postss[0];
            
        
        }
            else{
       
        this.postss = await getPost({keyword : this.post,keyword2 : this.orderBy});
        this.posts=this.postss[0];
        
        }

        this.posts.forEach(p => {
                
            if(p.Type__c === 'Question'){p.img__c=this.question;}
            if(p.Type__c === 'Article'){p.img__c=this.article;}
            if(p.Type__c === 'Implementation'){p.img__c=this.solution;}
    
        });

        if(this.detail.tous==true){ this.posts=this.postss[0];}
        if(this.detail.articles==true){this.posts=this.postss[0].filter(po => po.Type__c === 'Article');}
        if(this.detail.challenges==true){this.posts=this.postss[0].filter(po => po.Type__c === 'Question');}
        if(this.detail.solutions==true){this.posts=this.postss[0].filter(po => po.Type__c === 'Implementation');}
        
    }
    
    
     
   viewRecord(event) {
        // Navigate to Account record page
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": event.target.getAttribute('data-arg1'),
                "objectApiName": "Post__c",
                "actionName": "view"
            },
        });
        console.log('test2');
    }

    viewRecord2(event) {
        // Navigate to Account record page
        console.log('test1');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": event.target.getAttribute('data-arg1'),
                "objectApiName": "User",
                "actionName": "view"
            },
        });
        console.log('test2');
    }

    
}