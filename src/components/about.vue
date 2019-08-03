<template>
    <div class="about-container">
        <div class="about-header">
            <h1>About Dodatodos</h1>
        </div>
        <div class="about-body">
            <p>
               <span>Dodatodos</span>  is a todo web application compatible with all browsers & devices built by <a href="#">Aissani Abdelillah</a> using the following technologies : </p>
                <ul>
                    <li><a href="https://vuejs.org/">Vue JS (Javascript framework)</a></li>
                    <li><a href="https://firebase.google.com/">Google Firebase (Backend platform)</a></li>
                    <li><a href="https://sass-lang.com/">Sass (Css preprocessor)</a></li>
                    <li>and of course <a href="">HTML 5</a> and <a href="">CSS 3</a></li>
                </ul>
            <p>
              <span>Dodatodos</span> is using cloud firestore database for data managment and the source code is available on the <a href="#" title="go to the repository">Github repository</a>
            </p>
            <div class="about-developer">
                <h1>About the developer</h1>
                <p>Aissani Abdelillah (Dadboz) is web developer with more than a year of experience building apps ... prefers using Vue Js framework and vanilla javascript, for more info  you can contact using the informations below :</p>
                <ul :style="{listStyle : 'none'}">
                    <li>Gmail : aissani.abdelillah@gmail.com</li>
                   
                </ul>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss">
.about-container {
    max-width: 120rem;
    margin: 0 auto;
    padding: 5rem 2rem;
    .about-header {
        text-align: center;
        font-family: 'Srisakdi';
        margin-bottom: 8rem;
        margin-top: 5rem;
        h1 {
            font-size: 6.2rem;
            font-weight: 600;
        }
    }
    .about-body {
        font-size: 3rem;
        ul {
            margin: 5rem 0;
            padding-left: 2rem;
        
            list-style: lower-greek;
            li {
                margin-bottom: 2rem;
            }
        }
        
    }
    .about-developer {
         h1 {
            font-size: 6.2rem;
            font-weight: 600;
             text-align: center;
            font-family: 'Srisakdi';
            margin-bottom: 6rem;
            margin-top: 6rem;
        }
        p {
            line-height: 7rem;
            text-align: center;
        }

    }
    span {
        font-family: 'Srisakdi';
        font-weight: 600;
        font-size: 4rem;
    }

}
</style>
