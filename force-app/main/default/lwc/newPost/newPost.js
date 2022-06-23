import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import popupCSS from '@salesforce/resourceUrl/popupCSS';
import { loadStyle } from 'lightning/platformResourceLoader';
import createPost from'@salesforce/apex/newPostController.createPostAllFields';
import createTags from'@salesforce/apex/newPostController.createTags';

export default class NewPost extends NavigationMixin(LightningElement) {    

    showScreen = true;
    showScreen1 = false;
    showScreen2 = false;
    showScreen3 = false;
    showScreen4 = false;
    showScreen5 = false;

    firstPage = true;
    finalPage = false;

    currentScreen = '1';

    @track recordId;
    @track type = '';
    @track title = '';
    @track description;
    @track tags;
    @track body = '';
    @track newTags = [];
    @track files = [];

    steps = [
        { label: 'Select a type', value: '1' },
        { label: 'General Information', value: '2' },
        { label: 'Add Body', value: '3' },
        { label: 'Preview', value: '4' },
    ];

    errorMsg = '';

    connectedCallback() {
        loadStyle(this, popupCSS);
    }

    //Handlers
    handleRecordId(event) {
        this.recordId = event.detail.recordId;
    }

    handleType(event) {
        this.type = event.detail.type;
    }

    handleAddTitle(event){
        this.title = event.detail.id;
    }

    handleAddDescription(event){
        this.description = event.detail.id;
    }

    handleAddTag(event) {
        this.newTags = [...this.newTags, {name : event.detail.id}];
    }

    handleRemoveTag(event) {
        this.newTags = this.newTags.filter((tag) => tag.name !== event.detail.id);
    }

    handleBody(event) {
        this.body = event.detail.body;
    }

    handleFiles(event) {
        this.files = JSON.parse(event.detail.files);
    }

    handleClick(event) {
        var clickedButtonName = event.target.name;
        
        if(clickedButtonName == 'start'){
            this.showNextScreen('Start');
        }

        if(clickedButtonName == 'saveAndQuit'){
            
            if(this.showScreen1 == true && this.type != ''){
                let result = this.template.querySelector('c-type-screen').createPost();
                this.showNextScreen('Redirect');
                this.errorMsg = '';
            }else if(this.showScreen2 == true && this.title != ''){
                this.template.querySelector('c-screen2').updatePost(this.recordId);
                this.showNextScreen('Redirect');
                this.errorMsg = '';
            }else if(this.showScreen3 == true && this.body != ''){
                this.template.querySelector('c-screen3').updatePost(this.recordId);
                this.showNextScreen('Redirect');
                this.errorMsg = '';
            }else if(this.showScreen4 == true){
                this.showNextScreen('Redirect');
                this.errorMsg = '';
            } else {
                this.errorMsg = 'please fill the required fields';
            }
        }

        if(clickedButtonName == 'save'){

            if(this.showScreen1 == true && this.type != ''){
                let result = this.template.querySelector('c-type-screen').createPost();
                this.showNextScreen('Next');
                this.errorMsg = '';
            }else if(this.showScreen2 == true && this.title != ''){
                this.template.querySelector('c-screen2').updatePost(this.recordId);
                this.showNextScreen('Next');
                this.errorMsg = '';
            }else if(this.showScreen3 == true && this.body != ''){
                this.template.querySelector('c-screen3').updatePost(this.recordId);
                this.showNextScreen('Next');
                this.errorMsg = '';
            }else if(this.showScreen4 == true){
                this.showNextScreen('Next');
                this.errorMsg = '';
            } else {
                this.errorMsg = 'please fill the required fields';
            }
        }

        if(clickedButtonName == 'previous'){
            this.showNextScreen('Back');
        }

        if(clickedButtonName == 'finish'){
            this.showNextScreen('Redirect');
        }
    }

    //Function used to switch between screens
    showNextScreen(direction){ 
        if(direction == 'Next'){
            var newScreen =  parseInt(this.currentScreen) + 1;
            var oldScreen =  parseInt(this.currentScreen);
            this['showScreen' + newScreen] = true;
            this['showScreen' + oldScreen] = false;
            this.currentScreen = newScreen.toString();
            if(this.currentScreen == '5'){
                this.finalPage = true;
            }
        } 
        if(direction == 'Start'){
            this.showScreen1 = true;
            this.showScreen = false;
            this.firstPage = false;
        }
        if(direction == 'Redirect'){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.recordId,
                    actionName: 'view',
                },
            });
        }
        if(direction == 'Finish'){

            this.createPost(this.recordId);

            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.recordId,
                    actionName: 'view',
                },
            });
        }
        if(direction == 'Back'){
            if(this.currentScreen == '1'){
                this.firstPage = true;
                this.showScreen1 = false;
                this.showScreen = true;
            }else{
                var newScreen =  parseInt(this.currentScreen) - 1;
                var oldScreen =  parseInt(this.currentScreen);
                this['showScreen' + newScreen] = true;
                this['showScreen' + oldScreen] = false;
                this.currentScreen = newScreen.toString();
            }
        }
    }

    //Apex controller
    async createPost(recordId){

        let tagsToInsert = [];

        for(let i = 0; i < this.newTags.length; i++) {
            let obj = this.newTags[i];
            this.tags = this.tags.concat(' ' + obj.name);
            tagsToInsert.push(obj.name)
        }

        await createPost({type: this.type, title: this.title, description: this.description, body: this.body, tags: this.tags}).then((result) => {
            console.log('tag creation success');
        }).catch((err) => {
            console.log(err);
        });

        await createTags({name: tagsToInsert}).then((result) => {
            console.log('tag creation success');
        }).catch((err) => {
            console.log(err);
        });
    }
}