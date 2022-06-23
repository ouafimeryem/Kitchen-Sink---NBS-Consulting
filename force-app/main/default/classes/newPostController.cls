public with sharing class newPostController {
    
    public newPostController() {

    }
    
    @AuraEnabled() 
    public static List<Tag__c> getTags() {
        
        List<Tag__c> tags = [SELECT Id, Name FROM Tag__c];

        return tags;
    }

    @AuraEnabled() 
    public static String createPost(String type) {
        Poste__c post = new Poste__c();
        post.Type__c = type;
        post.Stage__c = 'Draft';
        post.Screen_Stage__c = '1';
        post.OwnerId = UserInfo.getUserId();
        
        insert post;
        
        return post.Id;
    }

    @AuraEnabled() 
    public static String createPostAllFields(String type, String title, String description, String body, String tags) {
        Poste__c post = new Poste__c();
        post.Type__c = type;
        post.title__c = title;
        post.Description__c = description;
        post.body__c = body;
        post.Tags__c = tags;
        post.Stage__c = 'Complete';
        post.Screen_Stage__c = '1';
        post.OwnerId = UserInfo.getUserId();
        
        insert post;
        
        return post.Id;
    }
    
    @AuraEnabled()
    public static Void updatePostGeneralInfo(String recordId, String title, String description, String tags) {
        try {
            Poste__c post = [SELECT title__c, Description__c FROM Poste__c WHERE Id=:recordId Limit 1];
            post.title__c = title;
            post.Description__c = description;
            post.Screen_Stage__c = '2';
            post.Tags__c = tags;

            update post;
        } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
    }
    
    @AuraEnabled()
    public static Void updatePostBody(String recordId, String body) {
        try {
            Poste__c post = [SELECT body__c FROM Poste__c WHERE Id=:recordId Limit 1];
            post.body__c = body;
            post.Screen_Stage__c = '3';
            post.Stage__c = 'Complete';
            
            update post;
        } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
    }

    @AuraEnabled()
    public static Void updatePostTags(String recordId, String tags) {
        try {
            Poste__c post = [SELECT Tags__c FROM Poste__c WHERE Id=:recordId Limit 1];
            post.Tags__c = tags;
            post.Screen_Stage__c = '5';
            post.Stage__c = 'Complete';
            
            update post;
        } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
    }

    @AuraEnabled()
    public static void createTags(List<String> name) {
    
        List<Tag__c> tags = new List<Tag__c>();
        List<Tag__c> oldTags = getTags();
        List<String> oldTagsString = new List<String>();

        for(Integer i=0; i<oldTags.size(); i++){
            oldTagsString.add(oldTags[i].Name);
        }

        for(Integer i=0; i<name.size(); i++){
            if (oldTagsString.contains(name[i])) {
                System.debug('already exists');
            }else {
                Tag__c tag = new Tag__c();
                tag.Name = name[i];
                tags.add(tag);
            }
        }
       
       insert tags;
    }

    @AuraEnabled()
    public static String createPostTag(String postId, String tagId) {
        PostTag__c postTag = new PostTag__c();
        postTag.Poste__c = postId;
        postTag.Tag__c = tagId;

       insert postTag;

       return postTag.Id;
    }
}