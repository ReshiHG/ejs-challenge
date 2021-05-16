//jshint esversion:6

        // Use express library
const   express = require("express"),
        // Use body-parser library
        bodyParser = require("body-parser"),
        // Declare app
        ejs = require("ejs"),
        // Use lodash library
        _ = require('lodash');

// Text to put
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Array to content all posts
let posts = [{
        title: "Title 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero eum minus modi facere quos, delectus vel iure mollitia illum earum et minima officia voluptatem sit eos blanditiis natus ipsam optio. Quos sit tenetur dolor illo quasi dolorum sapiente quae expedita, amet voluptates distinctio, esse tempore libero numquam deleniti quia, incidunt sequi quis dicta doloremque qui alias cupiditate quod, enim autem. Unde quaerat eius sunt, quam repellat praesentium. Veritatis ut libero doloremque eum dignissimos fugit, voluptates consequatur, soluta a iusto earum et? Veritatis velit vel numquam, magni perferendis deleniti, earum rerum aut aspernatur consequuntur quo adipisci! Vitae libero illo veniam inventore iure, earum consequatur soluta ratione natus eveniet asperiores quo mollitia laudantium dignissimos ullam numquam temporibus sapiente eum debitis quidem nobis, fugiat ipsa explicabo. Mollitia iste perspiciatis repudiandae cumque inventore assumenda ratione officia eaque necessitatibus accusantium tenetur, saepe quo porro corporis illum minima, voluptates. Quisquam iste voluptatibus nisi quam. Magni asperiores sapiente eius maiores obcaecati odio nemo ipsum quaerat repellat, fugit. Nobis dolor maxime voluptatem quidem at, vitae non repellendus ab dolores ea voluptatibus alias ad dignissimos nemo aliquam explicabo vel impedit magnam, harum tempora totam soluta deserunt! Pariatur, iusto sit laborum deserunt voluptates sapiente, consequatur adipisci natus, magnam cupiditate iste."
    },
    {
        title: "First Day",
        content: "Vivamus et urna quis augue tempor mollis. Curabitur fermentum, nisl quis pharetra vulputate, nisl felis tempor elit, sed molestie justo purus at libero. Integer iaculis suscipit magna, at tempus lectus ullamcorper nec. Donec sed ultrices arcu, quis commodo augue. Nullam eget libero nec magna commodo facilisis ac vel turpis. Fusce facilisis, justo sit amet congue rhoncus, nunc lectus luctus mauris, sed gravida mauris augue vel magna. Ut odio urna, facilisis ac aliquet ac, imperdiet sit amet ante. Vivamus a vulputate nibh. Donec et mi porta purus sodales sagittis non ac metus. Maecenas dictum, nulla ac molestie placerat, elit massa sagittis sapien, sed semper turpis turpis vel ante. Morbi vel efficitur tortor. Etiam tincidunt dui a justo volutpat auctor. Donec ut semper eros, in dictum ipsum. Sed viverra suscipit nisl ac tincidunt. Nunc tincidunt, dui sed varius pharetra, nulla lacus tincidunt nunc, rhoncus faucibus enim mi sed sapien. Maecenas imperdiet risus vitae sapien porta laoreet."
    }];

const app = express();

// Declare i'm use ejs
app.set('view engine', 'ejs');

// For use "app.post" correctly
app.use(bodyParser.urlencoded({extended: true}));

// To express can read files in "public" folder
app.use(express.static("public"));


// -----------------------------    GET    ------------------------------------

app.get("/", (req, res) => {
    res.render("home",{
        homeText: homeStartingContent,
        postsArray: posts
    });
});

app.get("/about", (req, res) => {
    res.render("about",{aboutText: aboutContent});
});

app.get("/contact", (req, res) => {
    res.render("contact",{contactText: contactContent});
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.get("/posts/:postName", (req, res) => {
    const namePost = req.params.postName;

    posts.forEach(el => {
        // Convert title of posts and url to de same format with "_.lowerCase"
        //
        // Example:
        //
        // _.lowerCase('--Foo-Bar--');
        // => 'foo bar'
        if (_.lowerCase(el.title) === _.lowerCase(namePost)) {
            // console.log(_.lowerCase(numeroPost));
            res.render("post",{
                title: el.title,
                content: el.content
            });
        }
    });
});


// ---------------------------    POST    --------------------------------------

app.post("/", (req, res) => {
    const newPost = {
        title: req.body.newTitle,
        content: req.body.newText
    }

    posts.push(newPost);

    res.redirect("/");
});


// -------------------------   Start server   ---------------------------------
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
