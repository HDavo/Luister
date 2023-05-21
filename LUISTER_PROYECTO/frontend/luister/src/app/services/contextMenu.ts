import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Router } from "@angular/router";
import { LuisterApiService } from "./luister-api.service";
import { LuisterCookieManagerService } from "./luister-cookie-manager.service";
import { ApibindingService } from "./apibinding.service";

@Injectable({
    providedIn: 'root'
})

export class ContexMenu {

    private contextMenu:any;
    private uLists:any = [];
    private userid:any;
    private etype!:string;
    private id:any;
    private renderer:Renderer2;

    constructor(
        rendererFactory:RendererFactory2,
        private router:Router,
        private luister: LuisterApiService,
        private fromSpoify: ApibindingService,
        private cookieService: LuisterCookieManagerService
    ){
        this.renderer = rendererFactory.createRenderer(null, null);
        this.userid = this.cookieService.get('userid');
        this.getUserLists();
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
                    menuElements: this.uLists
                }
            ],
        };
        let option, result:any[] = [];

        options[etype].forEach((element:any) =>{
            if(element.type != 'menu' || this.userid){
                option = this.createOption(element);
                result.push(option);
            }
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
                    });
                }else if(caption == 'Editar'){
                    this.renderer.listen(option, 'click', ()=>{
                        this.updateList();
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
                menuElements.forEach((listE:any) =>{
                    let submenu = this.renderer.createElement('li');
                    this.renderer.addClass(submenu, 'ccm-option');
                    this.renderer.appendChild(submenu, this.renderer.createText(listE.caption));
                    this.renderer.listen(submenu, 'click', ()=>{
                        this.addTrackToList(listE.clid);
                    })
                    this.renderer.appendChild(subMenCont, submenu);
                });
                this.renderer.appendChild(menuElement, subMenCont);
                this.renderer.appendChild(option, menuElement);
                return option;
            }
        }

        return creator[type]();
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
    getUserLists(){
        if(this.userid){
            this.luister.getUserCustomList(this.userid)
            .subscribe((response:any)=>{
                response.data.forEach((list:any, index:number) =>{
                    this.uLists[index] = {caption: list.title, clid: list.id};
                });
            });
        }
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
    navigateTo(url:string) {
        this.router.navigate([url]);
        document.documentElement.scrollTop = 0;
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
            userid: this.userid
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
    updateList(){
        const params = {
            clid: this.id,
            userid: this.userid
        }
        this.luister.updateList.emit(params);
        this.removeContexMenu();
    }
    addTrackToList(listid:any){
        let data = {
                title: '',
                artist: '',
                listid: listid,
                lookupkey: this.id
            }

        this.fromSpoify.getTrack(this.id)
        .then((response:any)=> {
            return response.subscribe((res:any)=>{
                data.title = res.name;
                res.artists.forEach((e:any)=>{
                    data.artist += e.name;
                });

                this.luister.addTrackToList(data)
                .subscribe((response:any)=>{
                    if(response.status == 200){
                        alert('Pista agregada a lista!');
                    }else alert(response.message);
                })
                this.removeContexMenu();
            });
        })
    }
}