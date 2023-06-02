
export class LuisterSweetAlert {
    private static colors:any = {
        img: '',
        title: '',
        paragraph: '',
        border: ''
    }
    static denie(paragraph:string,title:string='',link:string='',linkcaption:string=''){
        this.colors = {
            img: '../../assets/images/cancelar.png',
            title: 'red',
            paragraph: 'rgb(255, 96, 96)',
            border: 'rgb(255, 182, 182)'
        }
        this.buildBanner(paragraph,this.colors,title,link,linkcaption);
    }
    static success(paragraph:string,title:string=''){
        this.colors = {
            img: '../../assets/images/verificado.png',
            title: 'rgb(61, 238, 162)',
            paragraph: 'rgb(35, 191, 124)',
            border: 'rgb(160, 234, 216)'
        }
        this.buildBanner(paragraph,this.colors,title);
    }
    static info(paragraph:string,title:string=''){
        this.colors = {
            img: '../../assets/images/informacion.png',
            title: 'rgb(73, 12, 119)',
            paragraph: 'rgb(158, 106, 197)',
            border: 'rgb(198, 155, 231)'
        }
        this.buildBanner(paragraph,this.colors,title);
    }

    private static buildBanner(paragraph:string,colors:any,title:string='',link:string='',linkcaption:string='ir'){
        const bannerContainer = document.createElement('div');
        bannerContainer.setAttribute('class','banner-container');
        
        bannerContainer.style.setProperty('--title-color', colors.title);
        bannerContainer.style.setProperty('--paragraph-color', colors.paragraph);
        bannerContainer.style.setProperty('--border-color', colors.border);

        const gif = document.createElement('img');
        gif.setAttribute('class','banner-gif');
        gif.setAttribute('src',colors.img);

        const bannerBody = document.createElement('div');
        bannerBody.setAttribute('class', 'banner-body');

        const ptitle = document.createElement('h1');
        ptitle.setAttribute('class','banner-body-title');
        const ptitlemessage = document.createTextNode(title);
        ptitle.appendChild(ptitlemessage);

        const pbodyp = document.createElement('p');
        pbodyp.setAttribute('class','banner-body-paragraph');
        const pmessage = document.createTextNode(paragraph);
        pbodyp.appendChild(pmessage);

        bannerBody.appendChild(ptitle);
        bannerBody.appendChild(pbodyp);

        const closeButton = document.createElement('button');
        closeButton.setAttribute('class', 'banner-close-button');
        closeButton.addEventListener('click',(event:any)=> event.target.parentNode.remove() );

        const buttonMessage = document.createTextNode('Aceptar');
        closeButton.appendChild(buttonMessage);

        bannerContainer.appendChild(gif);
        bannerContainer.appendChild(bannerBody);

        if(link){
            const thisLink = document.createElement('a');
            thisLink.setAttribute('class', 'link');
            thisLink.setAttribute('href', link);
            const linkCaption = document.createTextNode(linkcaption);
            thisLink.appendChild(linkCaption);
            bannerContainer.appendChild(thisLink);
        }

        bannerContainer.appendChild(closeButton);
        document.getElementsByTagName('body')[0].appendChild(bannerContainer);
    }
}