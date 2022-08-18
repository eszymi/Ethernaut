# Ethernaut

<!-- PROJECT SHIELDS -->
<!--




<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE REPO -->
## About The Repo

This repo contains solutions of ethernaut's challenge made in hardhat. I added many helpful comments inside my code to help everyone who, similar to me, is on the very beginig of the journey with blockchain. When I have been creating this repo I wondered where I had problems and what kind of help I needed. I will be very grateful if this repo could help you, even a bit.

Addidionaly I decided make a blog where I want to describe aspect of theory which is neccesery in every challange. But using of this opportunity I want to write there significantly more theory than is needed to solve ethernaut's problems, because I think this is a great place to it. The link to this blog is here:  


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* git
You'll know you did it right if you can run ```git --version``` and you see a response like ```git version x.x.x```
* Nodejs
You'll know you did it right if you can run ```node --version``` and you see a response like ```vx.x.x```
* Yarn instead of npm
You'll know you did it right if you can run ```yarn --version``` and you see a response like ```x.x.x```


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/eszymi/Ethernaut.git
   ```
2. Install yarn packages
   ```sh
   yarn
   ```
3. Create file .env and copy there content from .env.example. Paste your own private key and url to connect with chain (you can get it e.g. [Alchemy](https://www.alchemy.com)). Also paste address of ethernaut's contract which you can find on the ethernaut web under the name instance address.


<!-- USAGE EXAMPLES -->
## Usage

I worked on forked rinkeby chain. Thanks to that I was able to work with challenge contract directly and avoid wait for confirmation from the chain. So my work was more quicker. To run your own forked chain run in new terminal ```sh yarn hardhat node```. As long as this terminal is open you will work on forked chain. If you want to work with not forked chain go to the hardhat.config.js file and set enabled to false inside forking part.

In folder contracts are contracts from ethernauts. The solutions of them you could find in the folder test. To run them use ```sh yarn hardhat test```. It will run all tests inside this folder. If you want to run only one test run ```sh yarn hardhat test ./test/<name of the test>.js```.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you see any error or have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

I will be very grateful for every hint what could be make better.


<!-- LICENSE -->
## License

Distributed under the MIT License. 

<!-- CONTACT -->
## Contact

Szymon - [@eszymin](https://twitter.com/eszymin) 

Project Link: [https://github.com/eszymi/Ethernaut](https://github.com/eszymi/Ethernaut)




<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* During this work I learn a lot from [cmichael](https://cmichel.io/ethernaut-solutions/). Thank you.


<p align="right">(<a href="#readme-top">back to top</a>)</p>




