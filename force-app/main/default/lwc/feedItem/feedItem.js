import { api, LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getPost from '@salesforce/apex/PostContr.getPost';
import solutionImg from '@salesforce/resourceUrl/solution';
import questionImg from '@salesforce/resourceUrl/question';
import articleImg from '@salesforce/resourceUrl/article';


export default class FeedItem extends NavigationMixin(LightningElement){

    postss =[]
    posts =[]
    postTest =[]
solution=solutionImg
question=questionImg
article=articleImg
post=''

async renderedCallback(){  
    if(this.post===''){
    console.log(this.post);
    this.postss = await getPost({keyword : 'P-0'});
    this.posts=this.postss[0];
    console.log(this.posts);
    this.posts.forEach(p => {
        
        if(p.Type__c === 'Question'){p.img__c=this.question;}
        if(p.Type__c === 'Article'){p.img__c=this.article;}
        if(p.Type__c === 'Implementation'){p.img__c=this.solution;}

    });this.post='P-0';}
    }

    async haldleChild(event){
        
        this.post=event.detail;
        if(this.post===''){
            console.log(this.post);
            this.postss = await getPost({keyword : 'P-0'});
            this.posts=this.postss[0];
            console.log(this.posts);
            this.posts.forEach(p => {
                
                if(p.Type__c === 'Question'){p.img__c=this.question;}
                if(p.Type__c === 'Article'){p.img__c=this.article;}
                if(p.Type__c === 'Implementation'){p.img__c=this.solution;}
        
            });}
            else{
        console.log(this.post);
        this.postss = await getPost({keyword : this.post});
        this.posts=this.postss[0];
        console.log(this.posts);
        this.posts.forEach(p => {
            
            if(p.Type__c === 'Question'){p.img__c=this.question;}
            if(p.Type__c === 'Article'){p.img__c=this.article;}
            if(p.Type__c === 'Implementation'){p.img__c=this.solution;}

        });
        }}
    
    
     
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

    artPosts(event) {
        this.posts=this.postss[0].filter(po => po.Type__c === 'Article');
        
       
    }

    chaPosts(event) {
        
        this.posts=this.postss[0];
        this.posts=this.posts.filter(po => po.Type__c === 'Question');
       
    }

    solPosts(event) {
        this.posts=this.postss[0];
        this.posts=this.posts.filter(po => po.Type__c === 'Implementation');
       
    }
    allPosts(event) {
        this.posts=this.postss[0];
       
       
    }
}