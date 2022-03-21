import "./iKh1.css";

const iKh1 = () => {
    const Ikh1 = document.createElement("h1");

    Ikh1.classList.add("iKh1Class");

    console.log("iK from iKh1.js file");

    //create 2 <p> & append to <h1> tag, which will inherit the h1 style & also do css grid to test autoprefixer for prod
    const IkP1 = document.createElement("p");
    IkP1.textContent = "iK1 from iKh1.js file";
    IkP1.classList.add("IkP1Class");
    Ikh1.appendChild(IkP1);

    const IkP2 = document.createElement("p");
    IkP2.textContent = "iK2 from iKh1.js file";
    IkP2.classList.add("IkP2Class");
    Ikh1.appendChild(IkP2);

    return Ikh1;
}; /*END iKh1 */

export default iKh1;
