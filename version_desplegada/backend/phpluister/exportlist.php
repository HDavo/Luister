<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") die();

    $listid=$listname=$tracks=$artist=$title=$buffer=$conection='';
    $type = '.csv';
    const FIRST = 0;
    const ONE = 1;
    const DIR = 'exports/';

    try {
        $conection = new PDO('mysql:host=luister.es:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        if(isset($_GET['listid'])){
            $listid=$_GET['listid'];
            $userid=$_GET['userid'];

            if($listid != 'fav-list'){
                $prepQ = $conection->prepare("SELECT title FROM customlists WHERE id = :id");
                $prepQ->bindParam(':id', $listid);
                $prepQ->execute();
                $res = $prepQ->fetch();
                $listname = strtr($res['title'], " ", "_");
            }else{
                $listname = 'favoritos';
            }
            if($listname){
                if($listid != 'fav-list'){
                    $prepQ = $conection->prepare("SELECT title, artists FROM customlisttracks WHERE customlistid = :customlistid");
                    $prepQ->bindParam(':customlistid', $listid);
                    $prepQ->execute();
                    $tracks = $prepQ->fetchAll();
                }else{
                    $prepQ = $conection->prepare("SELECT title, artists FROM favoritetracks WHERE userid = :userid");
                    $prepQ->bindParam(':userid', $userid);
                    $prepQ->execute();
                    $tracks = $prepQ->fetchAll();
                }
                if(count($tracks) > FIRST){

                    $destination = DIR.'list_'.$listid.'/';

                    if(!file_exists(DIR)) mkdir(DIR, 0700);

                    if(!file_exists($destination)) mkdir($destination, 0700);

                    $buffer = fopen($destination.$listname.$type, 'w');

                    foreach ($tracks as $key => $track) {
                        $artist = json_decode($track['artists'])[FIRST]->name;
                        $title = $track['title'];
                        fputs($buffer, $artist.','.$title.(($key < (count($tracks) - ONE))?"\n":""));
                    }
                    fclose($buffer);

                    echo json_encode(['status'=>200, 'message'=>['name'=>$listname,'src'=>'https://luister.es:7000/'.$destination.$listname.$type]]);
                }else echo json_encode(['status'=>406, 'message'=>'Lista de reproducción vacía']);
            }else echo json_encode(['status'=>406, 'message'=>'La lista de reproducción indicada no existe']);
        }else echo json_encode(['status'=>400, 'message'=>'Peticion incorrecta ']);
    } catch (PDOException $e) {
        die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado '.$e->getMessage()]));
    }


?>
