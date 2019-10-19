const mongoose = require("mongoose")
const configureAndStartMongo = require("../../mongoose/configureAndStart")
// const Searchs = mongoose.model("Users")

// Listas para generar los datos
const male_names_list=['James','John','Robert','Michael','William','David','Richard','Charles','Joseph','Thomas','Christopher','Daniel','Paul','Mark','Donald','George','Kenneth','Steven','Edward','Brian','Ronald','Anthony','Kevin','Jason','Matthew','Gary','Timothy','Jose','Larry','Jeffrey','Frank','Scott','Eric','Stephen','Andrew','Raymond','Gregory','Joshua','Jerry','Dennis','Walter','Patrick','Peter','Harold','Douglas','Henry','Carl','Arthur','Ryan','Roger','Joe','Juan','Jack','Albert','Jonathan','Justin','Terry','Gerald','Keith','Samuel','Willie','Ralph','Lawrence','Nicholas','Roy','Benjamin','Bruce','Brandon','Adam','Harry','Fred','Wayne','Billy','Steve','Louis','Jeremy','Aaron','Randy','Howard','Eugene','Carlos','Russell','Bobby','Victor','Martin','Ernest','Phillip','Todd','Jesse','Craig','Alan','Shawn','Clarence','Sean','Philip','Chris','Johnny','Earl','Jimmy','Antonio','Danny','Bryan','Tony','Luis','Mike','Stanley','Leonard','Nathan','Dale','Manuel','Rodney','Curtis','Norman','Allen','Marvin','Vincent','Glenn','Jeffery','Travis','Jeff','Chad','Jacob','Lee','Melvin','Alfred','Kyle','Francis','Bradley','Jesus','Herbert','Frederick','Ray','Joel','Edwin','Don','Eddie','Ricky','Troy','Randall','Barry','Alexander','Bernard','Mario','Leroy','Francisco','Marcus','Micheal','Theodore','Clifford','Miguel','Oscar','Jay','Jim','Tom','Calvin','Alex','Jon','Ronnie','Bill','Lloyd','Tommy','Leon','Derek','Warren','Darrell','Jerome','Floyd','Leo','Alvin','Tim','Wesley','Gordon','Dean','Greg','Jorge','Dustin','Pedro','Derrick','Dan','Lewis','Zachary','Corey','Herman','Maurice','Vernon','Roberto','Clyde','Glen','Hector','Shane','Ricardo','Sam','Rick','Lester','Brent','Ramon','Charlie','Tyler','Gilbert','Gene','Marc','Reginald','Ruben','Brett','Angel','Nathaniel','Rafael','Leslie','Edgar','Milton','Raul','Ben','Chester','Cecil','Duane','Franklin','Andre','Elmer','Brad','Gabriel','Ron','Mitchell','Roland','Arnold','Harvey','Jared','Adrian','Karl','Cory','Claude','Erik','Darryl','Jamie','Neil','Jessie','Christian','Javier','Fernando','Clinton','Ted','Mathew','Tyrone','Darren','Lonnie','Lance','Cody','Julio','Kelly','Kurt','Allan','Nelson','Guy','Clayton','Hugh','Max','Dwayne','Dwight','Armando','Felix','Jimmie','Everett','Jordan','Ian','Wallace','Ken','Bob','Jaime','Casey','Alfredo','Alberto','Dave','Ivan','Johnnie','Sidney','Byron','Julian','Isaac','Morris','Clifton','Willard','Daryl','Ross','Virgil','Andy','Marshall','Salvador','Perry','Kirk','Sergio','Marion','Tracy','Seth','Kent','Terrance','Rene','Eduardo','Terrence','Enrique','Freddie','Wade']
const surnames_list=['Smith','Johnson','Williams','Brown','Jones','Miller','Davis','Garcia','Rodriguez','Wilson','Martinez','Anderson','Taylor','Thomas','Hernandez','Moore','Martin','Jackson','Thompson','White','Lopez','Lee','Gonzalez','Harris','Clark','Lewis','Robinson','Walker','Perez','Hall','Young','Allen','Sanchez','Wright','King','Scott','Green','Baker','Adams','Nelson','Hill','Ramirez','Campbell','Mitchell','Roberts','Carter','Phillips','Evans','Turner','Torres','Parker','Collins','Edwards','Stewart','Flores','Morris','Nguyen','Murphy','Rivera','Cook','Rogers','Morgan','Peterson','Cooper','Reed','Bailey','Bell','Gomez','Kelly','Howard','Ward','Cox','Diaz','Richardson','Wood','Watson','Brooks','Bennett','Gray','James','Reyes','Cruz','Hughes','Price','Myers','Long','Foster','Sanders','Ross','Morales','Powell','Sullivan','Russell','Ortiz','Jenkins','Gutierrez','Perry','Butler','Barnes','Fisher','Henderson','Coleman','Simmons','Patterson','Jordan','Reynolds','Hamilton','Graham','Kim','Gonzales','Alexander','Ramos','Wallace','Griffin','West','Cole','Hayes','Chavez','Gibson','Bryant','Ellis','Stevens','Murray','Ford','Marshall','Owens','Mcdonald','Harrison','Ruiz','Kennedy','Wells','Alvarez','Woods','Mendoza','Castillo','Olson','Webb','Washington','Tucker','Freeman','Burns','Henry','Vasquez','Snyder','Simpson','Crawford','Jimenez','Porter','Mason','Shaw','Gordon','Wagner','Hunter','Romero','Hicks','Dixon','Hunt','Palmer','Robertson','Black','Holmes','Stone','Meyer','Boyd','Mills','Warren','Fox','Rose','Rice','Moreno','Schmidt','Patel','Ferguson','Nichols','Herrera','Medina','Ryan','Fernandez','Weaver','Daniels','Stephens','Gardner','Payne','Kelley','Dunn','Pierce','Arnold','Tran','Spencer','Peters','Hawkins','Grant','Hansen','Castro','Hoffman','Hart','Elliott','Cunningham','Knight','Bradley','Carroll','Hudson','Duncan','Armstrong','Berry','Andrews','Johnston','Ray','Lane','Riley','Carpenter','Perkins','Aguilar','Silva','Richards','Willis','Matthews','Chapman','Lawrence','Garza','Vargas','Watkins','Wheeler','Larson','Carlson','Harper','George','Greene','Burke','Guzman','Morrison','Munoz','Jacobs','Obrien','Lawson','Franklin','Lynch','Bishop','Carr','Salazar','Austin','Mendez','Gilbert','Jensen','Williamson','Montgomery','Harvey','Oliver','Howell','Dean','Hanson','Weber','Garrett','Sims','Burton','Fuller','Soto','Mccoy','Welch','Chen','Schultz','Walters','Reid','Fields','Walsh','Little','Fowler','Bowman','Davidson','May','Day','Schneider','Newman','Brewer','Lucas','Holland','Wong','Banks','Santos','Curtis','Pearson','Delgado','Valdez','Pena','Rios','Douglas','Sandoval','Barrett','Hopkins','Keller','Guerrero','Stanley','Bates','Alvarado','Beck','Ortega','Wade','Estrada','Contreras','Barnett','Caldwell','Santiago','Lambert','Powers','Chambers','Nunez','Craig','Leonard','Lowe','Rhodes','Byrd','Gregory','Shelton','Frazier','Becker','Maldonado','Fleming','Vega','Sutton','Cohen','Jennings','Parks','Mcdaniel','Watts','Barker','Norris','Vaughn','Vazquez','Holt','Schwartz','Steele','Benson','Neal','Dominguez','Horton','Terry','Wolfe','Hale','Lyons','Graves','Haynes','Miles','Park','Warner','Padilla','Bush','Thornton','Mccarthy','Mann','Zimmerman','Erickson','Fletcher','Mckinney','Page','Dawson','Joseph','Marquez','Reeves','Klein','Espinoza','Baldwin','Moran','Love','Robbins','Higgins','Ball','Cortez','Le','Griffith','Bowen','Sharp','Cummings','Ramsey','Hardy','Swanson','Barber','Acosta','Luna','Chandler','Blair','Daniel','Cross','Simon','Dennis','Oconnor','Quinn','Gross','Navarro','Moss','Fitzgerald','Doyle','Mclaughlin','Rojas','Rodgers','Stevenson','Singh','Yang','Figueroa','Harmon','Newton','Paul','Manning','Garner','Mcgee','Reese','Francis','Burgess','Adkins','Goodman','Curry','Brady','Christensen','Potter','Walton','Goodwin','Mullins','Molina','Webster','Fischer','Campos','Avila','Sherman','Todd','Chang','Blake','Malone','Wolf','Hodges','Juarez','Gill','Farmer','Hines','Gallagher','Duran','Hubbard','Cannon','Miranda','Wang','Saunders','Tate','Mack','Hammond','Carrillo','Townsend','Wise','Ingram','Barton','Mejia','Ayala','Schroeder','Hampton','Rowe','Parsons','Frank','Waters','Strickland','Osborne','Maxwell','Chan','Deleon','Norman','Harrington','Casey','Patton','Logan','Bowers','Mueller','Glover','Floyd','Hartman','Buchanan','Cobb','French','Kramer','Mccormick','Clarke','Tyler','Gibbs','Moody','Conner','Sparks','Mcguire','Leon','Bauer','Norton','Pope','Flynn','Hogan','Robles','Salinas','Yates','Lindsey','Lloyd','Marsh','Mcbride','Owen','Solis','Pham','Lang','Pratt','Lara','Brock','Ballard','Trujillo','Shaffer','Drake','Roman','Aguirre','Morton','Stokes','Lamb','Pacheco','Patrick','Cochran','Shepherd','Cain','Burnett','Hess','Li','Cervantes','Olsen','Briggs','Ochoa','Cabrera','Velasquez','Montoya','Roth','Meyers','Cardenas','Fuentes','Weiss','Wilkins','Hoover','Nicholson','Underwood','Short','Carson','Morrow','Colon','Holloway','Summers','Bryan','Petersen','Mckenzie','Serrano','Wilcox','Carey','Clayton','Poole','Calderon','Gallegos','Greer','Rivas','Guerra','Decker','Collier','Wall','Whitaker','Bass','Flowers','Davenport','Conley','Houston','Huff','Copeland','Hood','Monroe','Massey','Roberson','Combs','Franco','Larsen','Pittman','Randall','Skinner','Wilkinson','Kirby','Cameron','Bridges','Anthony','Richard','Kirk','Bruce','Singleton','Mathis','Bradford','Boone','Abbott','Charles','Allison','Sweeney','Atkinson','Horn','Jefferson','Rosales','York','Christian','Phelps','Farrell','Castaneda','Nash','Dickerson','Bond','Wyatt','Foley','Chase','Gates','Vincent','Mathews','Hodge','Garrison','Trevino','Villarreal','Heath','Dalton','Valencia','Callahan','Hensley','Atkins','Huffman','Roy','Boyer','Shields','Lin','Hancock','Grimes','Glenn','Cline','Delacruz','Camacho','Dillon','Parrish','Oneill','Melton','Booth','Kane','Berg','Harrell','Pitts','Savage','Wiggins','Brennan','Salas','Marks','Russo','Sawyer','Baxter','Golden','Hutchinson','Liu','Walter','Mcdowell','Wiley','Rich','Humphrey','Johns','Koch','Suarez','Hobbs','Beard','Gilmore','Ibarra','Keith','Macias','Khan','Andrade','Ware','Stephenson','Henson','Wilkerson','Dyer','Mcclure','Blackwell','Mercado','Tanner','Eaton','Clay','Barron','Beasley','Oneal','Small','Preston','Wu','Zamora','Macdonald','Vance','Snow','Mcclain','Stafford','Orozco','Barry','English','Shannon','Kline','Jacobson','Woodard','Huang','Kemp','Mosley','Prince','Merritt','Hurst','Villanueva','Roach','Nolan','Lam','Yoder','Mccullough','Lester','Santana','Valenzuela','Winters','Barrera','Orr','Leach','Berger','Mckee','Strong','Conway','Stein','Whitehead','Bullock','Escobar','Knox','Meadows','Solomon','Velez','Odonnell','Kerr','Stout','Blankenship','Browning','Kent','Lozano','Bartlett','Pruitt','Buck','Barr','Gaines','Durham','Gentry','Mcintyre','Sloan','Rocha','Melendez','Herman','Sexton','Moon','Hendricks','Rangel','Stark','Lowery','Hardin','Hull','Sellers','Ellison','Calhoun','Gillespie','Mora','Knapp','Mccall','Morse','Dorsey','Weeks','Nielsen','Livingston','Leblanc','Mclean','Bradshaw','Glass','Middleton','Buckley','Schaefer','Frost','Howe','House','Mcintosh','Ho','Pennington','Reilly','Hebert','Mcfarland','Hickman','Noble','Spears','Conrad','Arias','Galvan','Velazquez','Huynh','Frederick','Randolph','Cantu','Fitzpatrick','Mahoney','Peck','Villa','Michael','Donovan','Mcconnell','Walls','Boyle','Mayer','Zuniga','Giles','Pineda','Pace','Hurley','Mays','Mcmillan','Crosby','Ayers','Case','Bentley','Shepard','Everett','Pugh','David','Mcmahon','Dunlap','Bender','Hahn','Harding','Acevedo','Raymond','Blackburn','Duffy','Landry','Dougherty','Bautista','Shah','Potts','Arroyo','Valentine','Meza','Gould','Vaughan','Fry','Rush','Avery','Herring','Dodson','Clements','Sampson','Tapia','Bean','Lynn','Crane','Farley','Cisneros','Benton','Ashley','Mckay','Finley','Best','Blevins','Friedman','Moses','Sosa','Blanchard','Huber','Frye','Krueger','Bernard','Rosario','Rubio','Mullen','Benjamin','Haley','Chung','Moyer','Choi','Horne','Yu','Woodward','Ali','Nixon','Hayden','Rivers','Estes','Mccarty','Richmond','Stuart','Maynard','Brandt','Oconnell','Hanna','Sanford','Sheppard','Church','Burch','Levy','Rasmussen','Coffey','Ponce','Faulkner','Donaldson','Schmitt','Novak','Costa','Montes','Booker','Cordova','Waller','Arellano','Maddox','Mata','Bonilla','Stanton','Compton','Kaufman','Dudley','Mcpherson','Beltran','Dickson','Mccann','Villegas','Proctor','Hester','Cantrell','Daugherty','Cherry','Bray','Davila','Rowland','Madden','Levine','Spence','Good','Irwin','Werner','Krause','Petty','Whitney','Baird','Hooper','Pollard','Zavala','Jarvis','Holden','Haas','Hendrix','Mcgrath','Bird','Lucero','Terrell','Riggs','Joyce','Mercer','Rollins','Galloway','Duke','Odom','Andersen','Downs','Hatfield','Benitez','Archer','Huerta','Travis','Mcneil','Hinton','Zhang','Hays','Mayo','Fritz','Branch','Mooney','Ewing','Ritter','Esparza','Frey','Braun','Gay','Riddle','Haney','Kaiser','Holder','Chaney','Mcknight','Gamble','Vang','Cooley','Carney','Cowan','Forbes','Ferrell','Davies','Barajas','Shea','Osborn','Bright','Cuevas','Bolton','Murillo','Lutz','Duarte','Kidd','Key','Cooke']
//contiene una lista de 1000 mascotas
const list_pets = require('./pets_MOCK_DATA.json')

/**
 * Verifica que la base de datos esté vacia, si no lo está lanza error
 */
function checkEmptyDB() {
    return mongoose.connection.db
        .listCollections({}, { nameOnly: true })
        .next(function(err, collinfo) {
            if (collinfo) {
                throw "\n**************\nThis DB it is not empty, please clean the BD before try to inizialice\nWe recommend try command 'dDB' for db clean\n**************\n"
            }
        })
    }
/**
 * Inicializa una cantidad de usuarios recibida de usuarios
 * @param {integer} numOfUsers 
 */
function inizialiceUsers(numOfUsers) {
    const Users = mongoose.model("Users")
    const promises = []
    for (let indexUser = 0; indexUser < numOfUsers; indexUser++) {
        promises.push(Users.newUser({
            name: male_names_list[indexUser],
            last_name: surnames_list[indexUser],
            email: `${male_names_list[indexUser]}${surnames_list[indexUser]}_mascotas@gmail.com`,
            password: "1234"
        }).then(r => console.log("user created", r)).catch(e => console.log(e)))
    }
    return Promise.all(promises)
}

function inizialicePets(cantUsers,cantPets) {
    const Users = mongoose.model("Users")
    const promises = []
    let indexActualPet = 0
    for (let iUser = 0; iUser < cantUsers; iUser++) {
        for (let iPet = 0; iPet < cantPets; iPet++) {
            promises.push(
                Users.findOne({name:male_names_list[iUser]})
                     .then(u => {pet = list_pets[indexActualPet++]
                                pet._id = pet.id.$oid 
                                u.addPet(pet)
                                return u.save()
                            }
                     )
            )
                
        }
    }
    return Promise.all(promises)
}

/**
 * inicializa searchs en todas las mascotas
 * @param {int} cantUsers 
 * @param {int} cantPets 
 */
function inizialiceSearchs(cantUsers,cantPets) {
    const Users = mongoose.model("Users")
    const cantTotalPets = cantUsers*cantPets
    //Creo un location point localizado en general belgrano
    const loc = {
        "type" : "Point",
        "coordinates" : [
            -35.769577,
            -58.498871
        ]
    }
    const promises = []
    for (let iPet = 0; iPet < cantTotalPets; iPet++) {
        promises.push(
            Users.newSearch(list_pets[iPet].id.$oid,loc,new Date('6-6-2019'))
                .then(search_id => {console.log("Search created:",search_id)})
                .catch(e=>console.log(e))
                )
    }
    return Promise.all(promises)
}

async function inizialice() {
    //Cantidad de usuarios a crear
    const cantUsers = 2
    //Cantidad de mascotas por usuario
    const cantPets = 2

    await configureAndStartMongo()
    try {
        //Verifico si la bd tiene datos, si los tiene lanza un error y termina la ejecución
        await checkEmptyDB()
        await inizialiceUsers(cantUsers)
        await inizialicePets(cantUsers,cantPets)
        await inizialiceSearchs(cantUsers,cantPets)
        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }

}

inizialice()
