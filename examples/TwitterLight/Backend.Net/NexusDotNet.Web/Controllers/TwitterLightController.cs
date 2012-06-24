using System.Collections.Generic;
using System.Web.Mvc;

namespace NexusDotNet.Web.Controllers
{
    public class TwitterLightController : Controller
    {
        private static readonly List<Tweet> Tweets = new List<Tweet>();
        
        [HttpPost]
        public JsonResult SaveTweet(Tweet tweet)
        {
            Tweets.Add(new Tweet { Text = tweet.Text });
            return Json(new Result{Message = "OK"});
        }
        
        [HttpGet]
        public JsonResult GetAllTweets()
        {
            return Json(Tweets, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Start()
        {
            return View();
        }

    }

    public class Tweet
    {
        public string Text { get; set; }
    }

    public class Result
    {
        public string Message { get; set; }
    }
}
