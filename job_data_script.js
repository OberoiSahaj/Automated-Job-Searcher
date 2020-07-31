let puppeteer = require("puppeteer");
let ObjectsToCsv = require('objects-to-csv');
let role = process.argv[2];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 1200));
}

(async function(){

    
    let browser = await puppeteer.launch({
        headless: false,
        slowMo: 120,
        defaultViewport: null
    });

    let all = await Promise.all( [monster( browser ), indeed( browser ), times( browser )]).then((data) => {
        return data;
      });

    let m_jobs = all[0];
    let i_jobs = all[1] ;
    let t_jobs = all[2] ;

    let all_jobs = m_jobs.concat(i_jobs).concat(t_jobs);

    const csv = new ObjectsToCsv(all_jobs);
    csv.toDisk('jobs.csv');
    
    console.log("Done! Check the jobs.csv");

    await browser.close();
})()

async function indeed(browser){

console.log("Entering indeed.com");

let tab = await browser.newPage();
await tab.goto("https://www.indeed.co.in/");

await tab.waitForSelector("input[placeholder='Job title, keywords, or company']");
await tab.type("input[placeholder='Job title, keywords, or company']", role) 

await tab.waitForSelector("input[placeholder='City, state, or pin code']");
await tab.type("input[placeholder='City, state, or pin code']", "Delhi") 
await tab.click("button[type='submit']");

await tab.waitForSelector("#resultsCol");

let titles = await tab.$$('.title');
let companies = await tab.$$('.company');
let summarys = await tab.$$('.summary')
let urls = await tab.$$(".title a[target ='_blank']");

await sleep();

let jobs = [];

for (let i = 0; i < titles.length; i++ ) {
    
    try{
        title = await tab.evaluate(li => li.innerText, titles[i]);
    }
    catch(e){

        if (title){            
        }
        else{
            title = ""
        }
    }
    try{
        comp = await tab.evaluate(li => li.innerText, companies[i]);
    }
    catch(e){
        if (comp){            
        }
        else{
            comp = ""
        }
    }

    try{
        jd = await tab.evaluate(li => li.innerText, summarys[i]);
    }

    catch(e){
        if (jd){            
        }
        else{
            jd = ""
        }
    }
    
    try{
        url = await tab.evaluate(li => li.href, urls[i]); 
    }    
    catch(e){
        if (url){            
        }
        else{
            url = ""
        }
    }
    let job = {
        "Job Title" : title,
        "Company" : comp,
        "Job Description": jd,
        "Location" : "Delhi",
        "Website" : "Indeed",
        "Apply Link" : url
      }

    jobs.push(job);
}
    
return jobs;
} 

    
  
async function monster(browser){

    let total_pages = await browser.pages();
    
    console.log("Entering monsterindia.com")
    let tab = total_pages[0];
    

    await tab.goto("https://www.monsterindia.com/", { waitUntil: "networkidle0" });
   
    await tab.waitForSelector("input[placeholder='Search by Skills, Company & Job Title']");
    await tab.type("input[placeholder='Search by Skills, Company & Job Title']", role);
   
    await tab.click("input[value='Search']");
    
    await sleep();
    await sleep();
    await tab.waitForSelector(".medium a"); 

    let titles = await tab.$$(".medium a");
    let companies = await tab.$$(".company-name .under-link");
    let jds = await tab.$$(".job-descrip");
    let locations = await tab.$$(".loc small");

    let jobs = [];
    
    for (let i = 0; i < titles.length; i++){

        try{
            title = await tab.evaluate(li => li.innerText, titles[i]);
        }
        catch(e){
    
            if (title){            
            }
            else{
                title = ""
            }
        }
        try{
            comp = await tab.evaluate(li => li.innerText, companies[i]);
        }
        catch(e){
            if (comp){            
            }
            else{
                comp = ""
            }
        }
    
        let j = 0;
        if (i != 0){
            j = i * 3;
        }
        
        try{
            location = await tab.evaluate(li => li.innerText, locations[j]);
        }
        catch(e){
            if (location){
            }
            else{
                location = ""
            }
        }

        try{
            jd = await tab.evaluate(li => li.innerText, summarys[i]);
        }
    
        catch(e){
            if (jd){            
            }
            else{
                jd = ""
            }
        }
        
        try{
            url = await tab.evaluate(li => li.href, urls[i]); 
        }    
        catch(e){
            if (url){            
            }
            else{
                url = ""
            }
        }

        let job = {
            "Job Title" : title,
            "Company" : comp,
            "Job Description": jd,
            "Location" : location,
            "Website" : "Monster",
            "Apply Link" : url
          }

        jobs.push(job);
    }

return jobs;
}

async function times(browser){


    console.log("Entering timesjobs.com");
    let tab = await browser.newPage();
    await tab.goto("https://www.timesjobs.com/", { waitUntil: "networkidle2" });

    await sleep();
    await tab.waitForSelector("#txtKeywords");
    await tab.type("#txtKeywords", role)

    await tab.waitForSelector("#txtLocation");
    await tab.type("#txtLocation", "Noida");
    await sleep();
    await tab.click("button[value='Search']");

    await tab.waitForSelector(".new-joblist"); 

    let titles = await tab.$$("h2");
    let companies = await tab.$$(".joblist-comp-name");
    let jds = await tab.$$(".list-job-dtl.clearfix li"); // 0, 2, 
    let urls = await tab.$$("h2 a");

    let jobs = [];
    
    for (let i = 0; i < titles.length; i++){

        try{
            title = await tab.evaluate(li => li.innerText, titles[i]);
        }
        catch(e){
    
            if (title){            
            }
            else{
                title = ""
            }
        }

        try{
            comp = await tab.evaluate(li => li.innerText, companies[i]);
        }
        catch(e){
            if (comp){            
            }
            else{
                comp = ""
            }
        }
    
        j = i * 2;
        
        try{
            jd = await tab.evaluate(li => li.innerText, jds[j]);
        }
        catch(e){
            if(jd){
            }
            else{
                jd = ""
            }
        }
        try{
            url = await tab.evaluate(li => li.href, urls[i]); 
        }
        catch(e){
            if(url){
            }
            else{
                url = ""
            }
        }

        let job = {
            "Job Title" : title,
            "Company" : comp,
            "Job Description": jd,
            "Location" : "Noida",
            "Website" : "Times Jobs",
            "Apply Link" : url
          }

        jobs.push(job);
    }

return jobs;
}