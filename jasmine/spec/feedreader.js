/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // My solution---------------------:
        it('have non-empty URLs', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            })
        });

         // My solution---------------------------:
         it('have non-empty names', function(){
           allFeeds.forEach(function(feed) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
           })
         });
    });

    //My solution starts here. Respected the suite, spec indentation hierarchy------:
    describe('The Menu', function() {

       //My solution----------------------------------:
       it('icon is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
       });

        //My solution------------------------------------:I simply trigger two consecutive 'click' events on the hamburger icon and see if the body class toggles accordingly. This test assumes that the inital state of the menu is 'hidden'!!!
        it('changes visibility on click', function(){
            $('.icon-list').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.icon-list').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });



    });

    //My solution starts here. Respected the suite, spec indentation hierarchy------:
    describe('Initial Entries', function(){

       //My Solution--------------------------------:
       var x = Math.floor(Math.random()*4); //Run the loadFeed with any of 1 of the 4 different sources...
       beforeEach(function(done){
         loadFeed(x, done)
         //big help from jasmine documentation!!
       });

       it('has at least one entry', function(){
          expect($('.feed .entry').length).toBeGreaterThan(0);
       });
    });

    //My solution starts here. Respected the suite, spec indentation hierarchy------:
    describe('New Feed Selection', function(){

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      //My solution-----------------------------------------:
      var initialFeed,
          newFeed;
      //Here I ensure loadFeed() runs with two different ids
      var x = Math.floor(Math.random()*4);
      var y = Math.floor(Math.random()*4);
      if (x===y) {
        y = (y+1)%4; //In case they random to same number
      }
      beforeEach(function(done){
        loadFeed(x, function(){
          initialFeed = $('.feed').html();
          done();
        });
      });

      it('must change content when another feed is selected', function(done){
        loadFeed(y, function(){
          newFeed = $('.feed').html();
          expect(newFeed).not.toEqual(initialFeed)
          done();
        });
      });
    });

}());
