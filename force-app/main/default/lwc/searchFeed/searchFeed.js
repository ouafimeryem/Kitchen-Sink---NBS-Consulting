import { LightningElement } from 'lwc';

export default class SearchFeed extends LightningElement {
        tous=true
        articles=false
        challenges=false
        solutions=false
        classes=true
        recents=false
        likes=false
        actifs=false
        key=''
    
        tousf(){
            if(this.tous==false){
                this.tous=true;
                this.articles=false;
                this.challenges=false;
                this.solutions=false;
                this.sendevent();
                console.log(' in likes');
    
            }}
            solutionsf(){
                if(this.solutions==false){
                    this.solutions=true;
                    this.articles=false;
                    this.challenges=false;
                    this.tous=false;
                    this.sendevent();
                    console.log(' in likes');
        
                }}
                challengesf(){
            if(this.challenges==false){
                this.challenges=true;
                this.articles=false;
                this.tous=false;
                this.solutions=false;
                this.sendevent();
                console.log(' in likes');
    
            }}
            articlesf(){
                if(this.articles==false){
                    this.articles=true;
                    this.tous=false;
                    this.challenges=false;
                    this.solution=false;
                    this.sendevent();
                    console.log(' in likes');
        
                }}
    likesf(){
        if(this.likes==false){
            this.likes=true;
            this.recents=false;
            this.actifs=false;
            this.classes=false;
            this.sendevent();
            console.log(' in likes');

        }

        
       
        
       
    }
    classesf(){
        if(this.classes==false){
            this.classes=true;
            this.recents=false;
            this.actifs=false;
            this.likes=false;
            this.sendevent();

        }
     
       
        
       
    }
    recentsf(){
        if(this.recents==false){
            this.recents=true;
            this.likes=false;
            this.actifs=false;
            this.classes=false;
            this.sendevent();

        }
        
       
        
       
    }
    actifsf(){
        if(this.actifs==false){
            this.actifs=true;
            this.likes=false;
            this.recents=false;
            this.classes=false;
            this.sendevent();

        }
        
       
        
       
    }

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
        this.key=event.target.value;
        this.sendevent();
    }
    sendevent(){
        console.log(' in send Event');
        const event2 = new CustomEvent('child', {
            // detail contains only primitives
            detail: {
                key:this.key,
                classes:this.classes,
                recents:this.recents,
                likes:this.likes,
                actifs:this.actifs,
                challenges:this.challenges,
                articles:this.articles,
                tous:this.tous,
                solutions:this.solutions 
            }
            });
            this.dispatchEvent(event2);

       
    }
}