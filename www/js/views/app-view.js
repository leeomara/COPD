/**
 * bdi/views/app-view.js
 * Backbone View that representsthe total Application
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

var AppView = Backbone.View.extend({



    questionCollection: null,
    questionContainer: '.questionContainer',
    allDoneTemplate: '#doneTemplate',
    currQuestion: null,
    counter: 1,
    events:{
        'click .next': 'getNextQuestion',
        'click .yes': 'yes',
        'click .no': 'no'
    },

    /**
    * initialize
    * Initializer for AppView
    * Called on construction of object
    */
    initialize : function(options) {

        //Bind this to the following functions
        _.bindAll(this, "getNextQuestion", "yes", "no");

        var that = this;
        this.questionCollection = options.questionCollection;

    },

    run: function() {
        this.getNextQuestion(0);
    },

    /**
    * getNextQuestion
    * Retrieves the next question based on the ID pushed in.
    * @param int - ID of the question to show
    */
    getNextQuestion: function(id) {
        this.currQuestion = this.questionCollection.get(id);
        this.currQuestion.set('counter',this.counter);
        this.counter ++;
        var questionView = new QuestionView({model:this.currQuestion});
        var el = questionView.render().el;

        var $questionContainer = this.$(this.questionContainer);
        $questionContainer.html(el);

        this.$('footer').hide();
        this.$('.'+this.currQuestion.get('status')).show();

    },

    yes: function(event) {
        this.getNextQuestion(this.currQuestion.get('yes'));
    },

    no: function(event) {
        this.getNextQuestion(this.currQuestion.get('no'));
    }


});