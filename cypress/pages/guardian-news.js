import Utils from "../utilities/utils";
const ut=new Utils();

class GuardianNews
{
    first_news_of_today="[data-id="+ "\""+ut.getTodayDate() +"\""+"]> div:nth-child(1) > ul > li:nth-child(1) > div";
}

export default GuardianNews