import { LightningElement, api } from 'lwc';
import createPost from'@salesforce/apex/newPostController.createPost';
import QUESTION from '@salesforce/resourceUrl/question';
import IMPLEMENTATION from '@salesforce/resourceUrl/solution';
import ARTICLE from '@salesforce/resourceUrl/article';
import questionDescription from '@salesforce/label/c.Question_Text_New_Post';
import implementationDescription from '@salesforce/label/c.Implementation_Text_New_Post';
import articleDescription from '@salesforce/label/c.Article_Text_New_Post';

export default class TypeScreen extends LightningElement {
    
    @api type;
    recordId;

    label = {
        questionDescription,
        implementationDescription,
        articleDescription
    };

    question = QUESTION;
    implementation = IMPLEMENTATION;
    article = ARTICLE;

    renderedCallback(){
        if(this.type == 'Question'){
            const element = this.template.querySelector('[data-id="question"]').classList.add('clicked');
            this.template.querySelector('[data-id="implementation"]').classList.remove('clicked');
            this.template.querySelector('[data-id="article"]').classList.remove('clicked');
        }
        if(this.type == 'Implementation'){
            const element = this.template.querySelector('[data-id="implementation"]').classList.add('clicked');
            this.template.querySelector('[data-id="question"]').classList.remove('clicked');
            this.template.querySelector('[data-id="article"]').classList.remove('clicked');
        }
        if(this.type == 'Article'){
            const element = this.template.querySelector('[data-id="article"]').classList.add('clicked');   
            this.template.querySelector('[data-id="question"]').classList.remove('clicked');
            this.template.querySelector('[data-id="implementation"]').classList.remove('clicked');
        }
    }

    //Handlers
    handleQuestionClick(event) {
        this.type = 'Question';
        const element = this.template.querySelector('[data-id="question"]').classList.add('clicked');
        this.template.querySelector('[data-id="implementation"]').classList.remove('clicked');
        this.template.querySelector('[data-id="article"]').classList.remove('clicked');
        
        const typeEvent = new CustomEvent("gettype", {
            detail: {type: this.type}
        });

        this.dispatchEvent(typeEvent);
    }

    handleImplementationClick() {
        this.type = 'Implementation';
        const element = this.template.querySelector('[data-id="implementation"]').classList.add('clicked');
        this.template.querySelector('[data-id="question"]').classList.remove('clicked');
        this.template.querySelector('[data-id="article"]').classList.remove('clicked');

        const typeEvent = new CustomEvent("gettype", {
            detail: {type: this.type}
        });

        this.dispatchEvent(typeEvent);
    }

    handleArticleClick() {
        this.type = 'Article';
        const element = this.template.querySelector('[data-id="article"]').classList.add('clicked');   
        this.template.querySelector('[data-id="question"]').classList.remove('clicked');
        this.template.querySelector('[data-id="implementation"]').classList.remove('clicked');

        const typeEvent = new CustomEvent("gettype", {
            detail: {type: this.type}
        });

        this.dispatchEvent(typeEvent);
    }

    //Apex controller
    @api async createPost(){
        await createPost({type: this.type}).then((result) => {
            console.log('creation success');
            this.recordId = result;
            
            const recordIdEvent = new CustomEvent("getrecordid", {
                detail: {recordId: this.recordId}
            });

            this.dispatchEvent(recordIdEvent);

        }).catch((err) => {
            console.log(err);
        });
    }
}