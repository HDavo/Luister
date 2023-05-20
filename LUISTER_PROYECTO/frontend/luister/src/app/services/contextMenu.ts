import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Router } from "@angular/router";
import { LuisterApiService } from "./luister-api.service";
import { LuisterCookieManagerService } from "./luister-cookie-manager.service";

@Injectable({
    providedIn: 'root'
})

export class ContexMenu {

    private contextMenu:any;
    private etype!:string;
    private id:any;
    private renderer:Renderer2;
    constructor(
        rendererFactory:RendererFactory2,
        private router:Router,
        private luister: LuisterApiService,
        private cookieService: LuisterCookieManagerService
    ){
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    insertContextMenu(event:any, target:any=document.getElementsByTagName('body')[0]){
        this.etype = this.getElementType(event.target).type,
        this.id = this.getElementType(event.target).id;
              
        if(this.etype && this.id){

            this.removeContexMenu();
            const contextMenu = this.renderer.createElement('div');
            this.renderer.addClass(contextMenu, 'customContextMenu');
            
            const _options = this.createMenuOptions(this.etype, this.id);
            
            _options.forEach(option => {
                this.renderer.appendChild(contextMenu, option);
            });
            
            this.renderer.appendChild(target, contextMenu);
            this.renderer.setStyle(contextMenu, 'left', event.clientX+'px');
            this.renderer.setStyle(contextMenu, 'top', event.clientY+'px');
        
            this.contextMenu = contextMenu;
            }
    }
    private createMenuOptions(etype:string,id:string){
        const options:any = {
            list: [
                {
                    type: 'link',
                    caption: 'Detalles',
                    url: `/details/${etype}/${id}`
                },
                {
                    type: 'action',
                    caption: 'Editar',
                },
                {
                    type: 'action',
                    caption: 'Eliminar',
                }
            ],
            artist: [
                {
                    type: 'link',
                    caption: 'Detalles',
                    url: `/details/${etype}/${id}`
                },
                {
                    type: 'action',
                    caption: 'Seguir',
                }
            ],
            album: [
                {
                    type: 'link',
                    caption: 'Detalles',
                    url: `/details/${etype}/${id}`
                },
                {
                    type: 'menu',
                    caption: 'Añadir a lista',
                    menuElements: [
                        {
                            caption: 'cocina'
                        },
                        {
                            caption: 'trekking'
                        }
                    ]
                }
            ],
            track: [
                {
                    type: 'link',
                    caption: 'Detalles',
                    url: `/details/${etype}/${id}`
                },
                {
                    type: 'menu',
                    caption: 'Añadir a lista',
                    menuElements: [
                        {
                            caption: 'cocina'
                        },
                        {
                            caption: 'trekking'
                        }
                    ]
                }
            ],
        };
        let option, result:any[] = [];

        options[etype].forEach((element:any) =>{
            option = this.createOption(element);
            result.push(option);
        });

        return result;
    }
    private createOption({type='',caption='',url='',menuElements=[]}){
        let option:any, menuElement:any;
        const creator:any = {
            link: ()=>{
                option = this.renderer.createElement('div');
                this.renderer.addClass(option, 'ccm-option');
                this.renderer.setAttribute(option, 'href', url);
                this.renderer.listen(option, 'click', ()=> this.navigateTo(url))
                this.renderer.appendChild(option, this.renderer.createText(caption));
                return option;
            },
            action: ()=>{
                option = this.renderer.createElement('div');
                this.renderer.addClass(option, 'ccm-option');
                this.renderer.appendChild(option, this.renderer.createText(caption));
                if(caption == 'Eliminar'){
                    this.renderer.listen(option, 'click', ()=>{
                        this.deleteList();
                    })
                }
                return option;
            },
            menu: ()=>{
                option = this.renderer.createElement('ul');
                this.renderer.addClass(option, 'ccm-option-menu');
                menuElement = this.renderer.createElement('li');
                this.renderer.addClass(menuElement, 'ccm-option');
                this.renderer.appendChild(menuElement, this.renderer.createText(caption));

                let subMenCont = this.renderer.createElement('ul');
                this.renderer.addClass(subMenCont, 'ccm-submenu-cont');
                menuElements.forEach((e:any) =>{
                    let submenu = this.renderer.createElement('li');
                    this.renderer.addClass(submenu, 'ccm-option');
                    this.renderer.appendChild(submenu, this.renderer.createText(e.caption));
                    this.renderer.appendChild(subMenCont, submenu);
                });
                this.renderer.appendChild(menuElement, subMenCont);
                this.renderer.appendChild(option, menuElement);
                return option;
            }
        }

        return creator[type]();
    }
    navigateTo(url:string) {
        this.router.navigate([url]);
        document.documentElement.scrollTop = 0;
    }
    private getElementType(element:any){
        
        let result:any = { type: '', id: ''};

        if(element.getAttribute('ctm')){
            result.type = element.getAttribute('ctm');
            result.id = element.id;
        }else{
            if(element.parentNode.getAttribute('ctm')){
                result.type = element.parentNode.getAttribute('ctm');
                result.id = element.parentNode.id;
            }else{
                if(element.parentNode.parentNode.getAttribute('ctm')){
                    result.type = element.parentNode.parentNode.getAttribute('ctm');
                    result.id = element.parentNode.parentNode.id;
                }
            }
        }

        if(element.id){
            result.id = element.id;
        }else{
            if(element.parentNode.id){
                result.id = element.parentNode.id;
            }else{
                if(element.parentNode.parentNode.id){
                    result.id = element.parentNode.parentNode.id;
                }
            }
        }
        return result;
    }   
    removeContexMenu(){
        if(this.contextMenu){
          this.contextMenu.remove();
          this.contextMenu = null;
        }
    }
    deleteList(){
        const params = {
            clid: this.id,
            userid: this.cookieService.get('userid')
        }
        if(confirm('¿Desea eliminar la lista?')){
            this.luister.deleteCustomList(params)
            .subscribe((res:any)=>{
                if(res){
                    this.luister.deletedList.emit(params.clid);
                }else {
                    console.log(res);
                }
            })
        }
        this.removeContexMenu();
    }
}