import React from "react";
function About() {
    const about = {
        textAlign: "center",
        color: "white",
        background: "linear-gradient(45deg, black,#0762C8)",
        padding: "70px 0",
      };
    
      const learn= {
        color: "white",
        textDecoration: "none",
        padding: "2px 10px",
        border: "0px solid #fff",
        borderRadius: "5px",
        transition: "background-color 0.3s ease",
        marginTop: "12px",
        display: "inline-block",
      };
    
      return (
        <div className="px-2" style={about}>
          <h1 className="text-3xl p-2">About Us</h1>
          <p className="p-2"> 
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
         </p>
          <div style={learn} sectionId="aboutSection">
           <button className="p-2">LEARN MORE</button> 
          </div>
        </div>
      )
}
export default About;