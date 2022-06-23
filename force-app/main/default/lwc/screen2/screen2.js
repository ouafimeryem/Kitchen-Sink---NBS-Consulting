import { LightningElement, api,track } from 'lwc';
import updatePost from'@salesforce/apex/newPostController.updatePostGeneralInfo';
import getTags from'@salesforce/apex/newPostController.getTags';
import createTags from'@salesforce/apex/newPostController.createTags';


export default class Screen2 extends LightningElement {

    @api title;
    @api description;
    tagList = [];
    @api newtags = [];
    tags = '';

    connectedCallback(){
        this.getTags();
    }

    //Handlers
    handleTitleInput(event){
        this.title = event.target.value;
        this.dispatchEvent(
            new CustomEvent(
              'addtitle', 
              { detail: { id: this.title } }
            )
        );
    }

    handleDescriptionInput(event){
        this.description = event.target.value;
        this.dispatchEvent(
            new CustomEvent(
              'adddescription', 
              { detail: { id: this.description } }
            )
        );
    }

    handleTagInput(event){
        if(event.keyCode === 13){
            this.newtags = [...this.newtags, {name : event.target.value}];
            this.dispatchEvent(
                new CustomEvent(
                  'addtag',
                  { detail: { id: event.target.value } }
                )
            );
        }
    }

    removeTag(event){
        this.newtags = this.newtags.filter((tag) => tag.name !== event.target.dataset.id);

        this.dispatchEvent(
            new CustomEvent(
              'removetag', 
              { detail: { id: event.target.dataset.id } }
            )
        );
    }

    //Call controller methods
    @api async getTags(){
        await getTags().then((result) => {

           let count = Object.keys(result).length;
            for(let i=0; i<count; i++){
                this.tagList.push(result[i].Name);
            }

        }).catch((err) => {
            console.log(err);
        });
    }

    @api async updatePost(recordId){

        let tagsToInsert = [];

        for(let i = 0; i < this.newtags.length; i++) {
            let obj = this.newtags[i];
            this.tags = this.tags.concat(' ' + obj.name);
            tagsToInsert.push(obj.name);
        }

        await updatePost({recordId: recordId, title: this.title, description: this.description, tags: this.tags}).then((result) => {
            console.log('general info update success');
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