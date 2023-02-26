/// <reference types="cypress" />

import GoogleSearch from "../pages/google-search";
import GuardianNews from "../pages/guardian-news"
import Utils from '../utilities/utils';
let testdata='';
const gn= new GuardianNews();
const gs= new GoogleSearch();
const ut=new Utils();


describe('Verify the first news displayed is valid or not', () => {
  beforeEach(function()  {
    cy.fixture('data.json').then((data)=>
    {
      this.data=data
    })
    cy.visit('/');
    ut.getNewsHeadline(gn.first_news_of_today).then((trimmed_news_headline_to_be_searched) => {
      ut.searchGoogle(trimmed_news_headline_to_be_searched);
      ut.clickOnElementInIframe(gs.cookies_frame_id,gs.cookies_reject_all_button)
      ut.enterValueInInputFiledAndPressEnterKeyboard(gs.search_google_input_box,trimmed_news_headline_to_be_searched)
      ut.clickOnElementInIframe(gs.cookies_frame_id,gs.cookies_reject_all_button)
      // cy.wait(1000)
      cy.scrollTo(0,500)
      // cy.wait(1000)
      });
  });

  it('should capture the text headline of the first news and search on Google and verify whether there is 2 or more than 2 search results are received', function () {
    ut.checkNumberofEntriesinGoogleSearchIsMoreThan(1)
  });

  it('to check whether the retrieved result has Guardian as one of them, if not append Guardian in the search box and see if the newly retrived results has Guardian in the top result', function () {
  ut.enterValueInInputFiledAndPressEnterKeyboard(gs.search_input_results_page,this.data.guardian_text)
  cy.wait(1000)
  ut.clickOnElementInIframe(gs.cookies_frame_id,gs.cookies_reject_all_button)
  ut.checkOneoftheResultsIs(this.data.guardian_url)
  })

})
