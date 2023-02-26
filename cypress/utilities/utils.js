/* eslint class-methods-use-this: off, cypress/no-force: off */


import GuardianNews from "../pages/guardian-news";
import GoogleSearch from "../pages/google-search";


const gs= new GoogleSearch();
class Utils {
    
  getTodayDate()
  {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const d= new Date();
  const todays_date= d.getDate()+ " " + monthNames[d.getMonth()]+ " " + d.getFullYear()
  return todays_date
  }

 acceptAllCookies() {
    cy.get('#onetrust-accept-btn-handler').click();
  }

  clickOnElementifVisible(element)
  {
    cy.get(element,{timeout:5000}).then(($el) => {
      if ($el.is('visible')) {
        cy.wrap($el).click();
      } else {
        cy.get('body',{timeout:5000}).scrollTo('bottom');
        cy.get(element,{timeout:5000}).should('be.visible').click();
      }
    });
  }
  
 searchGoogle(searched_query) {
    cy.origin('https://www.google.co.uk', {args:[searched_query]}, ([searched_query])=> {

      cy.visit('/');
      cy.wait(1000)

 })
        
}

clickOnElementInIframe(frameid,element){

  cy.get(frameid,{timeout:5000}).then($iframe => {
    const $button = $iframe.contents().find(element,{timeout:5000});
    cy.wrap($button).click();
  });

}

checkForHyperLinkContentInIframe(frameid,expected_source){

  cy.get(frameid,{timeout:5000}).then($iframe => {
    const $button = $iframe.contents().find(element,{timeout:5000});
    cy.wrap($button).contains('a', expected_source).should('exist')
  });

}



  
getNewsHeadline(news_headline_to_be_searched) {
  let trimmed_news_headline_to_be_searched='';
  return cy.get(news_headline_to_be_searched,{timeout:5000}).then(($news_headline) => {
    const structured_news_headline = $news_headline.text().replace(/[^a-zA-Z ]/g, "");
    const trimmed_news_headline = structured_news_headline.trim();
    if (trimmed_news_headline.substring(0,4)=="Live")
    {
      const start_word = "Live";
      const end_word = "live";
      const start_index = trimmed_news_headline.indexOf(start_word) + start_word.length;
      const end_index = trimmed_news_headline.indexOf(end_word, start_index);
      const news_headline_to_be_searched = trimmed_news_headline.slice(start_index, end_index);
      return  trimmed_news_headline_to_be_searched = news_headline_to_be_searched.trim();
    }
      else
      {
        const news_headline_to_be_searched = trimmed_news_headline.slice(0, 40);
        return  trimmed_news_headline_to_be_searched = news_headline_to_be_searched.trim();
      }
    

  });   
  
}



checkNumberofEntriesinGoogleSearchIsMoreThan(expected_number){
  cy.get(gs.search_google_input_box,{timeout:5000}).should('have.length.greaterThan', expected_number);
}

checkOneoftheResultsIs(expected_source)
{
  cy.contains(expected_source).should('be.visible')
}
     


enterValueInInputFiledAndPressEnterKeyboard(element,value)
{
  cy.get(element,{timeout:5000}).type(value).type('{enter}')
}

}
export default Utils
  