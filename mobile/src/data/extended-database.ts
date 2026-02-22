// Extended database for comprehensive word validation
// Similar to world-places.ts but for other categories

// ============================================
// WORLD NAMES DATABASE - International names
// ============================================
export const WORLD_NAMES_SET = new Set<string>([
  // A
  'aaron', 'abdul', 'abdullah', 'abigail', 'abraham', 'ada', 'adam', 'adele', 'adrian', 'adriana', 'agnes', 'ahmad', 'ahmed', 'aiden', 'aileen', 'aimee', 'akiko', 'akira', 'alan', 'albert', 'alberto', 'alejandro', 'alex', 'alexander', 'alexandra', 'alexis', 'alfred', 'ali', 'alice', 'alicia', 'alina', 'alison', 'allen', 'allison', 'alma', 'alvin', 'alyssa', 'amanda', 'amber', 'amelia', 'ami', 'amin', 'amina', 'amir', 'amy', 'ana', 'anastasia', 'andrea', 'andreas', 'andres', 'andrew', 'andy', 'angel', 'angela', 'angelica', 'angelina', 'angie', 'anil', 'anita', 'ann', 'anna', 'anne', 'annette', 'annie', 'anthony', 'antonio', 'april', 'archie', 'aria', 'ariana', 'ariel', 'arnold', 'arthur', 'arya', 'ash', 'ashley', 'audrey', 'aurora', 'austin', 'ava', 'ayako', 'ayumi',
  // B
  'bailey', 'barbara', 'barry', 'beatrice', 'bella', 'ben', 'benjamin', 'bernard', 'beth', 'betty', 'beverly', 'bill', 'billy', 'blake', 'bob', 'bobby', 'bonnie', 'boris', 'brad', 'bradley', 'brandon', 'brenda', 'brendan', 'brett', 'brian', 'brianna', 'bridget', 'brittany', 'brooke', 'bruce', 'bruno', 'bryan', 'bryce',
  // C
  'caitlin', 'caleb', 'cameron', 'camila', 'camille', 'carl', 'carla', 'carlos', 'carmen', 'carol', 'carolina', 'caroline', 'carolyn', 'carrie', 'casey', 'catherine', 'cecilia', 'chad', 'charles', 'charlie', 'charlotte', 'chase', 'chelsea', 'chen', 'cheryl', 'chiara', 'chloe', 'chris', 'christian', 'christina', 'christine', 'christopher', 'cindy', 'claire', 'clara', 'clarence', 'claude', 'claudia', 'clayton', 'clifford', 'clyde', 'cody', 'colin', 'colleen', 'connie', 'connor', 'constance', 'corey', 'courtney', 'craig', 'crystal', 'curtis', 'cynthia',
  // D
  'daisy', 'dakota', 'dale', 'dallas', 'dalton', 'damian', 'damon', 'dan', 'dana', 'daniel', 'daniela', 'danielle', 'danny', 'darcy', 'darlene', 'darren', 'darryl', 'dave', 'david', 'dawn', 'dean', 'deanna', 'debbie', 'deborah', 'debra', 'delilah', 'denis', 'dennis', 'derek', 'derrick', 'destiny', 'devin', 'devon', 'diana', 'diane', 'diego', 'dimitri', 'dolores', 'dominic', 'don', 'donald', 'donna', 'doris', 'dorothy', 'douglas', 'drew', 'dustin', 'dylan',
  // E
  'earl', 'eddie', 'edgar', 'edith', 'edmund', 'edward', 'edwin', 'eileen', 'elaine', 'eleanor', 'elena', 'eli', 'elijah', 'elisa', 'elisabeth', 'elise', 'eliza', 'elizabeth', 'ella', 'ellen', 'ellie', 'elliot', 'ellis', 'elmer', 'elsa', 'elsie', 'elvis', 'emilia', 'emily', 'emma', 'emmanuel', 'enrique', 'eric', 'erica', 'erik', 'erika', 'erin', 'ernest', 'esther', 'ethan', 'eugene', 'eva', 'evan', 'eve', 'evelyn', 'everett', 'ezra',
  // F
  'faith', 'fatima', 'faye', 'felicia', 'felix', 'fernando', 'fiona', 'florence', 'floyd', 'frances', 'francis', 'francisco', 'frank', 'franklin', 'fred', 'frederick', 'freddy', 'freya',
  // G
  'gabriel', 'gabriela', 'gabriella', 'gail', 'garrett', 'gary', 'gavin', 'gene', 'genevieve', 'geoffrey', 'george', 'georgia', 'gerald', 'geraldine', 'gerard', 'gina', 'ginger', 'giovanni', 'gladys', 'glen', 'glenda', 'glenn', 'gloria', 'gordon', 'grace', 'gracie', 'graham', 'grant', 'greg', 'gregory', 'gretchen', 'guadalupe', 'guillermo', 'guy', 'gwen', 'gwendolyn',
  // H
  'hailey', 'haley', 'hamid', 'hana', 'hannah', 'hans', 'harold', 'harriet', 'harry', 'harvey', 'hassan', 'hayden', 'hazel', 'heather', 'hector', 'heidi', 'helen', 'helena', 'henry', 'herbert', 'herman', 'hikaru', 'hillary', 'himari', 'hiroshi', 'holly', 'homer', 'hope', 'howard', 'hugo', 'hugh', 'hunter',
  // I
  'ian', 'ibrahim', 'ida', 'ignacio', 'imani', 'imogen', 'india', 'ingrid', 'irene', 'iris', 'irma', 'irving', 'isaac', 'isabel', 'isabella', 'isabelle', 'isaiah', 'isidore', 'ivan', 'ivy',
  // J
  'jack', 'jackie', 'jackson', 'jacob', 'jacqueline', 'jade', 'jaden', 'jaime', 'jake', 'james', 'jamie', 'jan', 'jane', 'janet', 'janice', 'jared', 'jasmine', 'jason', 'jasper', 'javier', 'jay', 'jayden', 'jean', 'jeanette', 'jeanne', 'jeff', 'jeffery', 'jeffrey', 'jenna', 'jennifer', 'jenny', 'jeremiah', 'jeremy', 'jerome', 'jerry', 'jesse', 'jessica', 'jessie', 'jesus', 'jill', 'jim', 'jimmy', 'jin', 'jo', 'joan', 'joanna', 'joanne', 'jocelyn', 'jodi', 'jody', 'joe', 'joel', 'joey', 'john', 'johnny', 'jon', 'jonathan', 'jordan', 'jorge', 'jose', 'joseph', 'josephine', 'josh', 'joshua', 'joy', 'joyce', 'juan', 'juanita', 'judith', 'judy', 'julia', 'julian', 'juliana', 'julie', 'juliet', 'julio', 'jun', 'june', 'junior', 'justin', 'justine',
  // K
  'kai', 'kaitlyn', 'kaito', 'karen', 'kari', 'karina', 'karl', 'karla', 'kate', 'katelyn', 'katherine', 'kathleen', 'kathryn', 'kathy', 'katie', 'katrina', 'kay', 'kayla', 'kaylee', 'kazuki', 'keisha', 'keith', 'kelly', 'kelsey', 'ken', 'kendall', 'kendra', 'kenneth', 'kenny', 'kent', 'kerry', 'kevin', 'kim', 'kimberly', 'kirk', 'koichi', 'krista', 'kristen', 'kristin', 'kristina', 'kristine', 'kristy', 'kurt', 'kyle', 'kylie',
  // L
  'lacey', 'lance', 'landon', 'lane', 'lara', 'larry', 'laura', 'lauren', 'laurence', 'laurie', 'lawrence', 'layla', 'lea', 'leah', 'lee', 'leigh', 'lena', 'leo', 'leon', 'leonard', 'leonardo', 'leroy', 'leslie', 'lester', 'levi', 'lewis', 'liam', 'lillian', 'lily', 'lincoln', 'linda', 'lindsay', 'lindsey', 'lisa', 'liu', 'lloyd', 'logan', 'lois', 'lola', 'lonnie', 'lorena', 'lorenzo', 'lori', 'lorraine', 'louis', 'louise', 'luca', 'lucas', 'lucia', 'lucille', 'lucy', 'luis', 'luke', 'luna', 'luther', 'lydia', 'lynda', 'lynn', 'lynne',
  // M
  'mabel', 'mack', 'mackenzie', 'macy', 'madeleine', 'madeline', 'madison', 'mae', 'maggie', 'mai', 'makoto', 'malcolm', 'malik', 'mallory', 'mandy', 'manuel', 'marc', 'marcela', 'marcia', 'marco', 'marcus', 'margaret', 'margarita', 'maria', 'mariah', 'marian', 'marianne', 'marie', 'marilyn', 'mario', 'marion', 'marisa', 'marissa', 'marjorie', 'mark', 'marlene', 'marlon', 'marsha', 'marshall', 'martha', 'martin', 'marvin', 'mary', 'mason', 'mathew', 'matilda', 'matt', 'matthew', 'maureen', 'maurice', 'max', 'maxine', 'maxwell', 'maya', 'megan', 'mei', 'melanie', 'melinda', 'melissa', 'melody', 'melvin', 'mercedes', 'meredith', 'mia', 'michael', 'micheal', 'michele', 'michelle', 'miguel', 'mika', 'mike', 'mildred', 'miles', 'milton', 'mindy', 'minnie', 'mira', 'miranda', 'miriam', 'misty', 'mitchell', 'mohammed', 'molly', 'monica', 'monique', 'morgan', 'morris', 'moses', 'muhammad', 'myra', 'myrtle',
  // N
  'nadine', 'naeem', 'nancy', 'naomi', 'natalie', 'natasha', 'nathan', 'nathaniel', 'neal', 'neil', 'nellie', 'nelson', 'neville', 'nicholas', 'nick', 'nicky', 'nicolas', 'nicole', 'nigel', 'nina', 'noah', 'noel', 'nora', 'norma', 'norman',
  // O
  'octavia', 'olga', 'olive', 'oliver', 'olivia', 'omar', 'opal', 'ora', 'orlando', 'oscar', 'otis', 'otto', 'owen',
  // P
  'pablo', 'paige', 'pamela', 'paris', 'pat', 'patricia', 'patrick', 'patsy', 'patty', 'paul', 'paula', 'pauline', 'pearl', 'pedro', 'peggy', 'penelope', 'penny', 'percy', 'perry', 'pete', 'peter', 'phil', 'philip', 'phillip', 'phoebe', 'phyllis', 'preston', 'priscilla',
  // Q
  'queen', 'quentin', 'quincy', 'quinn',
  // R
  'rachael', 'rachel', 'rafael', 'ralph', 'ramon', 'ramona', 'randall', 'randolph', 'randy', 'raquel', 'rashid', 'ray', 'raymond', 'rebecca', 'rebekah', 'regina', 'reginald', 'rene', 'renee', 'rex', 'rhonda', 'ricardo', 'richard', 'rick', 'ricky', 'riley', 'rita', 'rob', 'robert', 'roberta', 'roberto', 'robin', 'robyn', 'rochelle', 'rocky', 'rod', 'roderick', 'rodney', 'roger', 'roland', 'roman', 'ron', 'ronald', 'ronnie', 'rosa', 'rosalie', 'rose', 'rosemary', 'rosie', 'ross', 'roxanne', 'roy', 'ruby', 'rudy', 'russell', 'ruth', 'ryan',
  // S
  'sabrina', 'sadie', 'sakura', 'sally', 'salvador', 'sam', 'samantha', 'samuel', 'sandra', 'sandy', 'santiago', 'sara', 'sarah', 'sasuke', 'saul', 'savannah', 'scott', 'sean', 'sebastian', 'selena', 'serena', 'sergio', 'seth', 'shane', 'shannon', 'shari', 'sharon', 'shaun', 'shawn', 'shawna', 'sheena', 'sheila', 'shelby', 'sheldon', 'shelia', 'shelley', 'shelly', 'sheri', 'sherri', 'sherry', 'sheryl', 'shirley', 'sidney', 'sierra', 'simon', 'sofia', 'sonia', 'sonja', 'sonya', 'sophia', 'sophie', 'spencer', 'stacey', 'stacy', 'stan', 'stanley', 'stella', 'stephanie', 'stephen', 'steve', 'steven', 'stewart', 'stuart', 'sue', 'summer', 'susan', 'susanne', 'susie', 'suzanne', 'sylvia', 'sydney',
  // T
  'tabitha', 'takeshi', 'tamara', 'tammy', 'tanya', 'tara', 'taryn', 'tasha', 'taylor', 'ted', 'teresa', 'teri', 'terrance', 'terrence', 'terri', 'terry', 'tess', 'tessa', 'theodore', 'theresa', 'thomas', 'tiffany', 'tim', 'timothy', 'tina', 'todd', 'tom', 'tommy', 'toni', 'tony', 'tonya', 'tracey', 'traci', 'tracy', 'travis', 'trent', 'trevor', 'tricia', 'trina', 'tristan', 'troy', 'tyler', 'tyrone',
  // U
  'ulysses', 'uma', 'umar', 'una', 'ursula',
  // V
  'valeria', 'valerie', 'vanessa', 'vaughn', 'vera', 'verna', 'vernon', 'veronica', 'vicki', 'vickie', 'vicky', 'victor', 'victoria', 'vincent', 'viola', 'violet', 'virginia', 'vivian',
  // W
  'wade', 'wallace', 'walter', 'wanda', 'warren', 'wayne', 'wei', 'wendell', 'wendy', 'wesley', 'whitney', 'wilbur', 'wilfred', 'will', 'willard', 'william', 'willie', 'willis', 'wilma', 'wilson', 'winnie', 'winston', 'wyatt',
  // X
  'xander', 'xavier', 'xena', 'ximena', 'xin',
  // Y
  'yolanda', 'yoshi', 'yuki', 'yusuf', 'yvette', 'yvonne',
  // Z
  'zachary', 'zack', 'zane', 'zelda', 'zoe', 'zoey',
]);

// ============================================
// ANIMALS DATABASE - Comprehensive list
// ============================================
export const ANIMALS_SET = new Set<string>([
  // A
  'aardvark', 'aardwolf', 'abalone', 'addax', 'african buffalo', 'african elephant', 'african leopard', 'african tree pangolin', 'african wild dog', 'agama', 'agouti', 'albatross', 'alligator', 'alpaca', 'american bison', 'american buffalo', 'american robin', 'amphibian', 'anaconda', 'anchovy', 'anemone', 'angel fish', 'angelfish', 'anglerfish', 'ant', 'anteater', 'antelope', 'antlion', 'ape', 'aphid', 'arab horse', 'arabian horse', 'arabian leopard', 'archer fish', 'archerfish', 'arctic fox', 'arctic wolf', 'armadillo', 'arrow crab', 'asp', 'asian elephant', 'atlantic puffin', 'axolotl', 'aye-aye',
  // B
  'baboon', 'badger', 'bald eagle', 'bali cattle', 'bandicoot', 'bangle tiger', 'barb', 'barnacle', 'barracuda', 'basilisk', 'bass', 'basset hound', 'bat', 'beagle', 'beaked whale', 'bear', 'bearded dragon', 'beaver', 'bedbug', 'bee', 'beetle', 'beluga', 'beluga whale', 'bengal tiger', 'big-horned sheep', 'billy goat', 'bird', 'bird of paradise', 'bison', 'black bear', 'black fly', 'black footed rhino', 'black mamba', 'black panther', 'black rhino', 'black widow', 'black widow spider', 'blackbird', 'bloodhound', 'blowfish', 'blue jay', 'blue whale', 'bluebird', 'boa', 'boa constrictor', 'boar', 'bob-cat', 'bobcat', 'bobolink', 'bonobo', 'booby', 'border collie', 'bottle-nose dolphin', 'bornean orang-utan', 'bovid', 'box jellyfish', 'boxer', 'boxer dog', 'brontosaurus', 'brown bear', 'buck', 'budgie', 'buffalo', 'bug', 'bull', 'bull frog', 'bull mastiff', 'bulldog', 'bullfrog', 'bumblebee', 'bunny', 'butterfly', 'buzzard',
  // C
  'caiman', 'caiman lizard', 'calf', 'camel', 'canary', 'canid', 'cape buffalo', 'capybara', 'caracal', 'cardinal', 'caribou', 'carp', 'cassowary', 'cat', 'caterpillar', 'catfish', 'catshark', 'cattle', 'centipede', 'cephalopod', 'chameleon', 'cheetah', 'chick', 'chickadee', 'chicken', 'chihuahua', 'chimpanzee', 'chinchilla', 'chipmunk', 'chupacabra', 'cicada', 'clam', 'clown fish', 'clownfish', 'cobra', 'cocker spaniel', 'cockatiel', 'cockatoo', 'cockroach', 'cod', 'coho', 'collie', 'colt', 'common dolphin', 'common seal', 'condor', 'constrictor', 'coral', 'corgi', 'cormorant', 'corn snake', 'cougar', 'cow', 'coyote', 'crab', 'crane', 'crane fly', 'crawdad', 'crawfish', 'crayfish', 'cricket', 'crocodile', 'crow', 'cub', 'cuckoo', 'cuckoo bird', 'cuttle fish', 'cuttlefish',
  // D
  'dachshund', 'dacshund', 'dalmatian', 'dalmation', 'damsel fly', 'damselfly', 'dart frog', 'deer', 'devi fish', 'diamond back rattler', 'dik-dik', 'dingo', 'dinosaur', 'doberman', 'doberman pinscher', 'dodo', 'dodo bird', 'doe', 'dog', 'dolly varden', 'dolphin', 'domestic bactrian camel', 'domestic canary', 'domestic dromedary camel', 'domestic duck', 'domestic goat', 'domestic goose', 'domestic guineafowl', 'domestic hedgehog', 'domestic pig', 'domestic pigeon', 'domestic rabbit', 'domestic silkmoth', 'domestic silver fox', 'domestic turkey', 'donkey', 'door mouse', 'dormouse', 'dove', 'draft horse', 'dragonfly', 'drake', 'duck', 'duckbill platypus', 'duckling', 'dugong', 'dung beetle',
  // E
  'eagle', 'earthworm', 'earwig', 'echidna', 'eclectus', 'eel', 'egret', 'elephant', 'elephant seal', 'elk', 'emu', 'english pointer', 'ermine', 'erne', 'eurasian lynx', 'ewe',
  // F
  'falcon', 'fancy mouse', 'fancy rat', 'fawn', 'felidae', 'fennec fox', 'ferret', 'filly', 'finch', 'firefly', 'fish', 'flamingo', 'flatworm', 'flea', 'flounder', 'fly', 'flying fish', 'flying squirrel', 'foal', 'fowl', 'fox', 'french bulldog', 'fresh water crocodile', 'frog', 'fruit bat',
  // G
  'galapagos land iguana', 'galapagos tortoise', 'galliform', 'gamefowl', 'gander', 'gayal', 'gazelle', 'gecko', 'gerbil', 'german shepherd', 'giant anteater', 'giant panda', 'giant squid', 'giant sting ray', 'gibbon', 'gila monster', 'gilt', 'giraffe', 'gnat', 'gnu', 'goat', 'golden retriever', 'goldfish', 'goose', 'gopher', 'gorilla', 'gosling', 'grasshopper', 'great blue heron', 'great dane', 'great white shark', 'green fly', 'green poison dart frog', 'green sea turtle', 'grey whale', 'greyhound', 'grizzly', 'grizzly bear', 'ground shark', 'ground sloth', 'groundhog', 'grouse', 'guan', 'guanaco', 'guinea pig', 'guineafowl', 'gull', 'guppy',
  // H
  'haddock', 'halibut', 'hammerhead', 'hammerhead shark', 'hamster', 'hare', 'harpy eagle', 'harrier', 'hawk', 'hedgehog', 'heifer', 'hen', 'hermit crab', 'heron', 'herring', 'hind', 'hippo', 'hippopotamus', 'hookworm', 'hornet', 'horse', 'horseshoe crab', 'hound', 'housefly', 'hoverfly', 'howler monkey', 'hummingbird', 'humpback whale', 'husky', 'hyena', 'hyrax',
  // I
  'ibex', 'ibis', 'iguana', 'iguanodon', 'impala', 'inchworm', 'insect', 'irrawaddy dolphin', 'irukandji jellyfish',
  // J
  'jackal', 'jackrabbit', 'jaguar', 'japanese macaque', 'jay', 'jellyfish', 'june bug', 'junglefowl',
  // K
  'kangaroo', 'kangaroo mouse', 'kangaroo rat', 'katydid', 'kid', 'killer whale', 'king cobra', 'king penguin', 'kingfisher', 'kinkajou', 'kite', 'kitten', 'kiwi', 'koala', 'koi', 'komodo dragon', 'kookaburra', 'krill', 'kudu',
  // L
  'lab rat', 'labrador', 'labrador retriever', 'ladybug', 'lamb', 'lamprey', 'lancelet', 'land snail', 'landfowl', 'lanternfish', 'lark', 'leatherback sea turtle', 'leech', 'lemming', 'lemur', 'leopard', 'leopardess', 'leopon', 'lice', 'liger', 'limpet', 'lion', 'lioness', 'lionfish', 'lizard', 'llama', 'lobster', 'locust', 'loon', 'louse', 'lovebird', 'lungfish', 'lynx',
  // M
  'macaque', 'macaw', 'mackerel', 'magpie', 'mallard', 'mammal', 'manatee', 'man-of-war', 'mandrill', 'manta ray', 'mantis', 'mare', 'marlin', 'marmoset', 'marmot', 'marsupial', 'marten', 'mastodon', 'meadowlark', 'meerkat', 'millipede', 'mink', 'minnow', 'mite', 'mockingbird', 'mole', 'mollusk', 'mollusks', 'monarch', 'monarch butterfly', 'mongoose', 'monitor lizard', 'monkey', 'moose', 'moray eel', 'mosquito', 'moth', 'mountain goat', 'mountain lion', 'mouse', 'mudskipper', 'mule', 'muskox', 'muskrat', 'mussel',
  // N
  'naked mole rat', 'narwhal', 'nautilus', 'newt', 'new world quail', 'nightingale', 'nightjar', 'numbat',
  // O
  'ocelot', 'octopus', 'okapi', 'old world quail', 'opossum', 'orangutan', 'orca', 'oriole', 'oryx', 'osprey', 'ostrich', 'otter', 'owl', 'ox', 'oyster',
  // P
  'panda', 'pangolin', 'panther', 'panthera hybrid', 'parakeet', 'parrot', 'parrotfish', 'partridge', 'peacock', 'peafowl', 'peahen', 'pelican', 'penguin', 'perch', 'peregrine falcon', 'pheasant', 'pig', 'pigeon', 'piglet', 'pike', 'pilot whale', 'pinniped', 'piranha', 'planarian', 'platypus', 'polar bear', 'polecat', 'pony', 'poodle', 'porcupine', 'porpoise', 'portuguese man o war', 'possum', 'poult', 'prairie dog', 'prawn', 'praying mantis', 'primate', 'pronghorn', 'ptarmigan', 'puffer fish', 'puffin', 'pug', 'puma', 'pup', 'puppy', 'python',
  // Q
  'quail', 'quelea', 'quetzal', 'quokka', 'quoll',
  // R
  'rabbit', 'raccoon', 'rainbow trout', 'ram', 'rat', 'rattlesnake', 'raven', 'ray', 'red fox', 'red panda', 'reindeer', 'reptile', 'rhino', 'rhinoceros', 'right whale', 'ringneck dove', 'roadrunner', 'robin', 'rodent', 'rook', 'rooster', 'rottweiler', 'roundworm',
  // S
  'saber-toothed cat', 'saber-toothed tiger', 'sailfish', 'salamander', 'salmon', 'salt water alligator', 'sand dollar', 'sandpiper', 'sardine', 'sawfish', 'scale insect', 'scallop', 'scorpion', 'sea anemone', 'sea cucumber', 'sea horse', 'sea lion', 'sea otter', 'sea slug', 'sea snail', 'sea turtle', 'sea urchin', 'seahorse', 'seal', 'shark', 'sheep', 'shih tzu', 'shoat', 'shrew', 'shrimp', 'siamese cat', 'siamese fighting fish', 'siberian husky', 'siberian tiger', 'silkworm', 'silverfish', 'skink', 'skunk', 'slender loris', 'sloth', 'sloth bear', 'slug', 'smelt', 'snail', 'snake', 'snapping turtle', 'snipe', 'snow fox', 'snow hare', 'snow leopard', 'snowy owl', 'society finch', 'sockeye salmon', 'sole', 'somali wild ass', 'sow', 'sparrow', 'spectacled bear', 'sperm whale', 'spider', 'spider monkey', 'sponge', 'spoonbill', 'squid', 'squirrel', 'stag', 'stallion', 'star-nosed mole', 'starfish', 'steelhead trout', 'steer', 'stingray', 'stoat', 'stork', 'sturgeon', 'sugar glider', 'swallow', 'swan', 'swift', 'swordfish', 'swordtail',
  // T
  'tadpole', 'tahr', 'takin', 'tamarin', 'tapeworm', 'tapir', 'tarantula', 'tarpan', 'tarsier', 'tasmanian devil', 'tazmanian devil', 'tazmanian tiger', 'termite', 'tern', 'terrapin', 'terrier', 'thoroughbred', 'thrush', 'tick', 'tiger', 'tiger shark', 'tiglon', 'tigress', 'toad', 'tortoise', 'toucan', 'trapdoor spider', 'tree frog', 'trout', 'tsetse fly', 'tuna', 'turkey', 'turtle', 'tyrannosaurus',
  // U
  'uakari', 'umbrella bird', 'umbrellabird', 'urchin', 'urial', 'urutu',
  // V
  'vampire bat', 'vampire squid', 'vaquita', 'velociraptor', 'velvet worm', 'vervet', 'vixen', 'vicuna', 'viper', 'viper fish', 'virginia opossum', 'vole', 'vulture',
  // W
  'wallaby', 'walrus', 'warbler', 'warthog', 'wasp', 'water boa', 'water buffalo', 'water dragons', 'weasel', 'weevil', 'whale', 'whale shark', 'whippet', 'white rhino', 'white tailed dear', 'white tiger', 'whooper', 'whooping crane', 'wild boar', 'wildcat', 'wildebeest', 'wildfowl', 'wolf', 'wolf spider', 'wolverine', 'wombat', 'woodchuck', 'woodpecker', 'worm', 'wren', 'widow spider',
  // X
  'x-ray fish', 'x-ray tetra', 'xerinae', 'xerus',
  // Y
  'yak', 'yellow bellied marmot', 'yellow belly sapsucker', 'yellow finned tuna', 'yellow jacket', 'yellow perch', 'yellowfin tuna', 'yeti', 'yorkshire terrier',
  // Z
  'zander', 'zebra', 'zebra dove', 'zebra finch', 'zebu', 'zorilla',
]);

// ============================================
// THINGS/OBJECTS DATABASE - Comprehensive list
// ============================================
export const THINGS_SET = new Set<string>([
  // A
  'abacus', 'accordion', 'acorn', 'adapter', 'address book', 'air conditioner', 'airplane', 'alarm', 'alarm clock', 'album', 'almirah', 'ambulance', 'amplifier', 'anchor', 'anklet', 'antenna', 'anvil', 'apartment', 'apple', 'apron', 'aquarium', 'arcade', 'arch', 'armchair', 'armor', 'arrow', 'art book', 'ashtray', 'attic', 'awning', 'axe',
  // B
  'backpack', 'badge', 'bag', 'bagel', 'ball', 'balloon', 'banana', 'bandage', 'bandana', 'banjo', 'bank', 'banner', 'barbell', 'barn', 'barrel', 'barricade', 'baseball', 'basket', 'basketball', 'bat', 'bath', 'bathrobe', 'bathroom', 'bathtub', 'battery', 'beach ball', 'bead', 'bean', 'beanbag', 'bed', 'bedspread', 'beer', 'bell', 'belt', 'bench', 'bicycle', 'binoculars', 'blanket', 'blender', 'blinds', 'block', 'blueprint', 'boat', 'bolt', 'bomb', 'bone', 'book', 'bookcase', 'bookmark', 'bookshelf', 'boomerang', 'boot', 'bottle', 'bow', 'bowl', 'box', 'bracelet', 'brake', 'branch', 'bread', 'brick', 'bridge', 'briefcase', 'brochure', 'broom', 'brush', 'bubble', 'bucket', 'buckle', 'building', 'bulb', 'bulletin board', 'bumper', 'bunk bed', 'buoy', 'bus', 'bush', 'butter', 'button',
  // C
  'cab', 'cabin', 'cabinet', 'cable', 'cage', 'cake', 'calculator', 'calendar', 'camera', 'can', 'candle', 'candy', 'cane', 'cannon', 'canoe', 'cap', 'car', 'card', 'cardboard', 'carpet', 'carriage', 'carrot', 'cart', 'carton', 'case', 'cash register', 'casket', 'cassette', 'castle', 'catalog', 'ceiling', 'cell phone', 'cement', 'chain', 'chair', 'chalk', 'chandelier', 'charger', 'chart', 'cheese', 'chess', 'chest', 'chime', 'chimney', 'chip', 'chisel', 'chocolate', 'chopsticks', 'church', 'cigarette', 'circle', 'clamp', 'clarinet', 'clay', 'cleaner', 'cliff', 'clip', 'clipboard', 'cloak', 'clock', 'closet', 'cloth', 'clothes', 'clothespin', 'cloud', 'coat', 'coat hanger', 'coffee', 'coffee maker', 'coffin', 'coin', 'collar', 'column', 'comb', 'comforter', 'comic book', 'compass', 'computer', 'concrete', 'cone', 'confetti', 'container', 'cookbook', 'cookie', 'cooler', 'cord', 'cork', 'corkscrew', 'corn', 'corner', 'couch', 'counter', 'coupon', 'cover', 'cracker', 'cradle', 'crane', 'crate', 'crayon', 'cream', 'crib', 'crowbar', 'crown', 'crutch', 'cube', 'cup', 'cupboard', 'cupcake', 'curtain', 'cushion', 'cylinder',
  // D
  'dagger', 'dart', 'dashboard', 'deck', 'decoration', 'desk', 'detergent', 'diamond', 'diary', 'dice', 'dictionary', 'dining table', 'diploma', 'dish', 'dishwasher', 'disk', 'dispenser', 'document', 'doll', 'dollar', 'dolly', 'dome', 'domino', 'door', 'doorbell', 'doorknob', 'doormat', 'doorway', 'dot', 'drawer', 'dress', 'dresser', 'drill', 'drink', 'drone', 'drum', 'dryer', 'duct tape', 'duffel bag', 'dumbbell', 'dumpster', 'dust pan', 'dvd',
  // E
  'earbud', 'earphone', 'earring', 'easel', 'egg', 'elastic', 'elbow', 'elevator', 'encyclopedia', 'engine', 'envelope', 'equipment', 'eraser', 'escalator', 'extension cord', 'eye', 'eyeglasses',
  // F
  'fabric', 'face', 'fan', 'faucet', 'fax machine', 'feather', 'fence', 'fender', 'ferry', 'fiddle', 'figurine', 'file', 'file cabinet', 'film', 'filter', 'finger', 'fire', 'fire extinguisher', 'fire hydrant', 'fireplace', 'firework', 'first aid kit', 'fishbowl', 'flag', 'flame', 'flashlight', 'flask', 'floor', 'floppy disk', 'flour', 'flower', 'flowerpot', 'flute', 'foam', 'folder', 'food', 'foot', 'football', 'footstool', 'fork', 'forklift', 'fountain', 'frame', 'freezer', 'fridge', 'frisbee', 'fruit', 'frying pan', 'funnel', 'fur', 'furnace', 'furniture', 'fuse',
  // G
  'game', 'game controller', 'garage', 'garbage', 'garden', 'garland', 'garlic', 'gas', 'gasoline', 'gate', 'gauge', 'gear', 'gem', 'generator', 'gift', 'gift wrap', 'glass', 'glasses', 'globe', 'glove', 'glue', 'goal', 'goggles', 'gold', 'golf ball', 'golf club', 'gong', 'gown', 'grain', 'gramophone', 'grape', 'graph', 'grass', 'grater', 'gravel', 'gravy boat', 'greenhouse', 'grill', 'grip', 'grocery', 'ground', 'guitar', 'gum', 'gun', 'gun powder', 'gunpowder',
  // H
  'hair', 'hair dryer', 'hairbrush', 'hairpin', 'hallway', 'hammer', 'hammock', 'hamper', 'hand', 'handbag', 'handcuffs', 'handle', 'hanger', 'hardware', 'harmonica', 'harness', 'harp', 'hat', 'hatchet', 'headband', 'headlight', 'headphones', 'headset', 'heart', 'heater', 'hedge', 'helicopter', 'helmet', 'highlighter', 'hinge', 'hockey stick', 'hoe', 'hole', 'hole puncher', 'hood', 'hook', 'hoop', 'horn', 'hose', 'hospital', 'hotel', 'hourglass', 'house', 'hoverboard', 'hub', 'hubcap',
  // I
  'ice', 'ice cream', 'ice cube', 'ice pack', 'ice skate', 'icicle', 'id card', 'ignition', 'incense', 'index card', 'inhaler', 'ink', 'instrument', 'ipad', 'ipod', 'iron', 'ironing board', 'island', 'ivory',
  // J
  'jack', 'jacket', 'jar', 'jeans', 'jeep', 'jelly', 'jet', 'jewel', 'jewelry', 'jewelry box', 'jigsaw', 'journal', 'joystick', 'jug', 'juice', 'jukebox', 'jump rope', 'jumper cables', 'junk',
  // K
  'kayak', 'keg', 'kennel', 'ketchup', 'kettle', 'key', 'keyboard', 'keychain', 'kindle', 'kiosk', 'kit', 'kitchen', 'kite', 'kleenex', 'knife', 'knob', 'knocker', 'knot',
  // L
  'label', 'lace', 'ladder', 'ladle', 'lamp', 'lampshade', 'lantern', 'laptop', 'lasso', 'latch', 'laundry', 'laundry basket', 'lawn', 'lawn mower', 'lead', 'leaf', 'leather', 'lectern', 'ledge', 'leg', 'lemon', 'lens', 'letter', 'letterbox', 'lever', 'library', 'license plate', 'lid', 'life jacket', 'lifeguard stand', 'light', 'light bulb', 'lighter', 'lighthouse', 'lightning', 'limousine', 'line', 'linen', 'link', 'lint', 'lip', 'lipstick', 'liquid', 'list', 'litter box', 'lock', 'locker', 'log', 'lollipop', 'loop', 'lotion', 'loudspeaker', 'lounge', 'luggage', 'lumber', 'lunch box',
  // M
  'machine', 'magazine', 'magnet', 'magnifying glass', 'mail', 'mailbox', 'mannequin', 'mantel', 'manual', 'map', 'marble', 'marker', 'mask', 'mat', 'match', 'mattress', 'measuring cup', 'measuring tape', 'medal', 'medicine', 'megaphone', 'memo', 'menu', 'metal', 'meter', 'microphone', 'microscope', 'microwave', 'milk', 'mill', 'mirror', 'missile', 'mitt', 'mitten', 'mixer', 'mobile', 'model', 'modem', 'money', 'monitor', 'mop', 'mortar', 'motorcycle', 'motor', 'mountain', 'mouse', 'mouse pad', 'mousetrap', 'mouth', 'muffin', 'mug', 'mulch', 'muscle', 'mushroom', 'music',
  // N
  'nachos', 'nail', 'nail clipper', 'nail polish', 'name', 'name tag', 'napkin', 'necklace', 'necktie', 'needle', 'net', 'newspaper', 'nickel', 'night light', 'nightstand', 'noodle', 'nose', 'note', 'notebook', 'notepad', 'number', 'nut', 'nutcracker',
  // O
  'oar', 'object', 'office', 'oil', 'ointment', 'olive', 'onion', 'orange', 'ornament', 'ottoman', 'outlet', 'oven', 'overalls', 'owl',
  // P
  'package', 'pacifier', 'pad', 'paddle', 'padlock', 'page', 'pail', 'paint', 'paintbrush', 'painting', 'pajamas', 'palette', 'pallet', 'pan', 'pancake', 'panel', 'pants', 'paper', 'paper clip', 'paper towel', 'parachute', 'parasol', 'park', 'parking meter', 'pasta', 'pastry', 'patch', 'path', 'patio', 'pattern', 'paw', 'pea', 'peach', 'peanut', 'pear', 'pearl', 'pebble', 'pedal', 'pedestal', 'peg', 'pen', 'pencil', 'pendant', 'penny', 'pepper', 'perfume', 'periscope', 'phone', 'photo', 'photo album', 'piano', 'pickle', 'picture', 'picture frame', 'pie', 'piece', 'pier', 'piggy bank', 'pillar', 'pillow', 'pin', 'pinball machine', 'pincushion', 'pipe', 'pitcher', 'pizza', 'place mat', 'placemat', 'plaid', 'plane', 'plank', 'plant', 'planter', 'plaque', 'plaster', 'plastic', 'plate', 'platform', 'platter', 'player', 'playground', 'playpen', 'pliers', 'plow', 'plug', 'plum', 'plunger', 'pocket', 'pocketknife', 'pod', 'podium', 'poem', 'point', 'poker', 'pole', 'polish', 'pond', 'ponytail holder', 'pool', 'pool table', 'popcorn', 'porch', 'portfolio', 'post', 'post office', 'postcard', 'poster', 'pot', 'potato', 'pottery', 'pouch', 'powder', 'power', 'power strip', 'present', 'press', 'pretzel', 'price', 'price tag', 'print', 'printer', 'prism', 'prize', 'projector', 'propeller', 'protractor', 'pudding', 'puddle', 'pulley', 'pump', 'pumpkin', 'punch', 'puppet', 'purse', 'puzzle',
  // Q
  'quart', 'quarter', 'quilt',
  // R
  'rack', 'racket', 'radiator', 'radio', 'raft', 'rag', 'rail', 'railroad', 'rain', 'rainbow', 'raincoat', 'rake', 'ramp', 'range', 'razor', 'receipt', 'recliner', 'record', 'record player', 'rectangle', 'recycling bin', 'reel', 'refrigerator', 'register', 'relay', 'remote', 'remote control', 'report', 'ribbon', 'rice', 'rifle', 'ring', 'rink', 'road', 'robe', 'robot', 'rock', 'rocket', 'rocking chair', 'rod', 'roller', 'roller skate', 'rolling pin', 'roof', 'room', 'rope', 'rose', 'router', 'row', 'rubber band', 'rug', 'ruler', 'runway',
  // S
  'sack', 'saddle', 'safe', 'safety pin', 'sail', 'sailboat', 'salt', 'salt shaker', 'sand', 'sandal', 'sandbox', 'sandpaper', 'sandwich', 'satellite', 'sauce', 'saucer', 'saw', 'saxophone', 'scale', 'scanner', 'scarf', 'schedule', 'scissors', 'scooter', 'scoreboard', 'scrapbook', 'screen', 'screw', 'screwdriver', 'sculpture', 'seal', 'seat', 'seat belt', 'seed', 'server', 'sewing machine', 'shade', 'shadow', 'shaker', 'shampoo', 'shape', 'shed', 'sheet', 'shelf', 'shell', 'shelter', 'shield', 'ship', 'shirt', 'shoe', 'shoelace', 'shop', 'shopping bag', 'shopping cart', 'shorts', 'shot glass', 'shoulder', 'shovel', 'shower', 'shredder', 'shrub', 'shutter', 'sidewalk', 'sign', 'silk', 'silo', 'silver', 'silverware', 'sink', 'skateboard', 'skeleton', 'sketch', 'ski', 'skillet', 'skin', 'skirt', 'skull', 'sled', 'sleeping bag', 'sleeve', 'slide', 'slingshot', 'slip', 'slipper', 'slot', 'slot machine', 'smartphone', 'smoke', 'smoke detector', 'snack', 'snap', 'sneaker', 'snow', 'snow globe', 'snowboard', 'snowflake', 'snowman', 'soap', 'soccer ball', 'sock', 'socket', 'soda', 'sofa', 'soil', 'solar panel', 'soldier', 'soup', 'space', 'spaceship', 'spade', 'spatula', 'speaker', 'spear', 'spectacles', 'speedometer', 'sphere', 'spice', 'spider', 'spinach', 'spiral', 'sponge', 'spoon', 'sport', 'spotlight', 'spot', 'spray', 'spray bottle', 'spreader', 'spring', 'sprinkler', 'square', 'squeeze bottle', 'squid', 'stable', 'stadium', 'staff', 'stage', 'stain', 'stair', 'staircase', 'stake', 'stamp', 'stand', 'staple', 'stapler', 'star', 'station', 'statue', 'steak', 'steam', 'steel', 'steering wheel', 'stem', 'step', 'step stool', 'stepladder', 'stereo', 'stethoscope', 'stick', 'sticker', 'stocking', 'stomach', 'stone', 'stool', 'stop sign', 'stoplight', 'stopwatch', 'storage', 'store', 'storm', 'stove', 'straw', 'stream', 'street', 'streetlight', 'stretcher', 'string', 'stripe', 'stroller', 'structure', 'stud', 'studio', 'submarine', 'sugar', 'suit', 'suitcase', 'sun', 'sunflower', 'sunglasses', 'surfboard', 'sweater', 'sweatshirt', 'switch', 'sword', 'syringe', 'system',
  // T
  'table', 'tablecloth', 'tablet', 'tack', 'tag', 'tail', 'tank', 'tape', 'tape measure', 'tape recorder', 'tarp', 'taser', 'tassel', 'taxi', 'tea', 'teacup', 'teapot', 'teddy bear', 'telephone', 'telescope', 'television', 'temple', 'tennis ball', 'tennis racket', 'tent', 'terminal', 'terrace', 'test tube', 'text', 'textbook', 'thermometer', 'thermos', 'thermostat', 'thimble', 'thread', 'throne', 'thumb', 'thumbtack', 'ticket', 'tie', 'tile', 'timer', 'tin', 'tire', 'tissue', 'toast', 'toaster', 'toe', 'toilet', 'toilet paper', 'tomato', 'tomb', 'tong', 'tongue', 'tool', 'toolbox', 'tooth', 'toothbrush', 'toothpaste', 'toothpick', 'top', 'torch', 'tornado', 'torpedo', 'tote', 'tote bag', 'towel', 'tower', 'town', 'toy', 'toy car', 'track', 'tractor', 'traffic cone', 'traffic light', 'trail', 'trailer', 'train', 'trampoline', 'trap', 'trash', 'trash bag', 'trash can', 'tray', 'treasure', 'tree', 'trellis', 'triangle', 'tricycle', 'trim', 'tripod', 'trolley', 'trophy', 'truck', 'trumpet', 'trunk', 'tub', 'tube', 'tulip', 'tumbler', 'tuna', 'tunnel', 'turkey', 'turntable', 'turret', 'tuxedo', 'tv', 'tweezers', 'twig', 'typewriter',
  // U
  'umbrella', 'umpire', 'undergarment', 'underwear', 'uniform', 'unit', 'universe', 'utensil',
  // V
  'vacuum', 'vacuum cleaner', 'valley', 'valve', 'van', 'vane', 'vanity', 'vase', 'vault', 'vegetable', 'vehicle', 'veil', 'vein', 'velcro', 'velvet', 'vending machine', 'vent', 'vest', 'video', 'video camera', 'video game', 'village', 'vine', 'vinegar', 'vinyl', 'violin', 'visa', 'visor', 'voice', 'volcano', 'volleyball',
  // W
  'waffle', 'waffle iron', 'wagon', 'walker', 'walkway', 'wall', 'wallet', 'wallpaper', 'wand', 'wardrobe', 'warehouse', 'washer', 'washing machine', 'watch', 'water', 'water bottle', 'water cooler', 'water fountain', 'water jug', 'waterfall', 'watermelon', 'wave', 'wax', 'weapon', 'weather vane', 'web', 'webcam', 'wedge', 'weed', 'weight', 'well', 'wet suit', 'wheat', 'wheel', 'wheelbarrow', 'wheelchair', 'whip', 'whisker', 'whistle', 'wick', 'widget', 'wig', 'wind', 'wind chime', 'windmill', 'window', 'windshield', 'wine', 'wine glass', 'wing', 'wire', 'wok', 'wood', 'wool', 'word', 'work', 'workbench', 'worm', 'wreath', 'wrench', 'wrist', 'wristband', 'wristwatch',
  // X
  'x-ray', 'xylophone',
  // Y
  'yacht', 'yard', 'yardstick', 'yarn', 'yeast', 'yo-yo', 'yogurt',
  // Z
  'zebra', 'zeppelin', 'zero', 'zinc', 'zip', 'zip tie', 'zipper', 'zone', 'zoo',
]);

// ============================================
// CARS DATABASE - Brands, models, and types
// ============================================
export const CARS_SET = new Set<string>([
  // A
  'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'acadia', 'accent', 'acclaim', 'accord', 'acura', 'aerio', 'airstream', 'alfa romeo', 'alfetta', 'allante', 'allroad', 'alpine', 'altima', 'amanti', 'amarok', 'amc', 'amg', 'aston martin', 'astra', 'atlas', 'audi', 'aurora', 'avalanche', 'avalon', 'avenger', 'aventador', 'aveo', 'azera', 'aztek',
  // B
  'beetle', 'bentley', 'benz', 'blazer', 'bmw', 'bolt', 'boxster', 'bravo', 'brera', 'bronco', 'bugatti', 'buick',
  // C
  'c-class', 'c-max', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'cabriolet', 'cadenza', 'cadillac', 'camaro', 'camry', 'captiva', 'caravan', 'carrera', 'cayenne', 'cayman', 'cc', 'celica', 'century', 'challenger', 'charger', 'cherokee', 'chevelle', 'chevrolet', 'chevy', 'chrysler', 'citroen', 'civic', 'cla', 'class', 'cls', 'cobalt', 'colorado', 'colt', 'commander', 'compass', 'continental', 'cooper', 'corolla', 'corona', 'corrado', 'corsair', 'corsa', 'corvette', 'countryman', 'coupe', 'cr-v', 'cr-z', 'cressida', 'crossfire', 'crosstour', 'crosstrek', 'cruze', 'ct4', 'ct5', 'ct6', 'cts', 'cube', 'cutlass',
  // D
  'daewoo', 'dart', 'datsun', 'defender', 'delta', 'denali', 'diablo', 'diesel', 'discovery', 'dodge', 'dts', 'durango', 'duster',
  // E
  'e-class', 'e-tron', 'eclipse', 'edge', 'elantra', 'eldorado', 'electric', 'element', 'elise', 'emgrand', 'enclave', 'encore', 'endeavor', 'envision', 'envoy', 'enzo', 'eos', 'equinox', 'equus', 'escalade', 'escape', 'escort', 'esprit', 'estate', 'ev', 'evoque', 'excursion', 'expedition', 'explorer', 'express',
  // F
  'f-150', 'f-250', 'f-350', 'f-450', 'f-pace', 'f-type', 'fairlady', 'fairlane', 'falcon', 'family', 'ferrari', 'fiat', 'fiesta', 'firebird', 'fit', 'flex', 'focus', 'ford', 'forenza', 'forester', 'forte', 'fortuner', 'fox', 'freelander', 'frontier', 'fusion', 'fx',
  // G
  'g-class', 'g-wagon', 'g35', 'g37', 'g70', 'g80', 'g90', 'galant', 'galaxie', 'gallardo', 'genesis', 'ghibli', 'giulia', 'giulietta', 'gla', 'glc', 'gle', 'glk', 'gls', 'gmc', 'golf', 'gran turismo', 'grand am', 'grand caravan', 'grand cherokee', 'grand marquis', 'grand prix', 'grand vitara', 'grandeur', 'granta', 'gt', 'gt-r', 'gti', 'gto', 'gx',
  // H
  'h1', 'h2', 'h3', 'hardtop', 'harrier', 'hatchback', 'highlander', 'hilux', 'honda', 'hr-v', 'hummer', 'huracan', 'hybrid', 'hyundai',
  // I
  'i3', 'i30', 'i4', 'i8', 'ibiza', 'id.4', 'impreza', 'impala', 'infiniti', 'insight', 'integra', 'ioniq', 'is', 'isuzu', 'ix35',
  // J
  'jaguar', 'jazz', 'jeep', 'jetta', 'jimny', 'journey', 'juke',
  // K
  'k5', 'k900', 'kadjar', 'karma', 'karoq', 'kia', 'kicks', 'kodiaq', 'koenigsegg', 'kona', 'ksmart',
  // L
  'lacrosse', 'lada', 'lamborghini', 'lancer', 'land cruiser', 'land rover', 'landrover', 'lanos', 'lariat', 'leaf', 'legacy', 'legend', 'leon', 'levante', 'lexus', 'liberty', 'lincoln', 'lm', 'logan', 'lotus', 'ls', 'lucerne', 'lumina', 'lx',
  // M
  'm-class', 'm2', 'm3', 'm4', 'm5', 'm6', 'm8', 'mach-e', 'macan', 'magna', 'malibu', 'maserati', 'matiz', 'maverick', 'maxima', 'maybach', 'mazda', 'mclaren', 'megane', 'mercedes', 'mercury', 'metris', 'mg', 'miata', 'micra', 'milan', 'mini', 'minivan', 'mirai', 'mirage', 'mito', 'mkc', 'mks', 'mkt', 'mkx', 'mkz', 'model 3', 'model s', 'model x', 'model y', 'monte carlo', 'montego', 'monterey', 'montero', 'morris', 'mountaineer', 'murano', 'mustang', 'mx-5',
  // N
  'nascar', 'navara', 'navigator', 'neo', 'new beetle', 'niro', 'nissan', 'note', 'nova', 'nsx', 'nx',
  // O
  'octavia', 'odyssey', 'oldsmobile', 'omega', 'opel', 'optima', 'orlando', 'outback', 'outlander',
  // P
  'pacifica', 'pajero', 'palisade', 'panamera', 'passat', 'pathfinder', 'patriot', 'peugeot', 'phantom', 'pickup', 'pilot', 'pinto', 'plymouth', 'polo', 'pontiac', 'porsche', 'prado', 'prelude', 'prius', 'proton', 'prowler', 'punto', 'pursuit',
  // Q
  'q3', 'q4', 'q5', 'q7', 'q8', 'q50', 'q60', 'q70', 'qashqai', 'quattro', 'quest', 'qx30', 'qx50', 'qx60', 'qx80',
  // R
  'r8', 'rac', 'ram', 'rambler', 'range rover', 'ranger', 'rapide', 'raptor', 'rav4', 'rc', 'rdx', 'regal', 'regera', 'relay', 'renault', 'renegade', 'rendezvous', 'rio', 'rivian', 'riviera', 'rl', 'roadster', 'rogue', 'rolls royce', 'romeo', 'rs', 'rs3', 'rs5', 'rs6', 'rs7', 'rsx', 'rx', 'rx-7', 'rx-8',
  // S
  's-class', 's-max', 's2000', 's3', 's4', 's5', 's6', 's7', 's8', 's60', 's80', 's90', 'sable', 'safari', 'santa cruz', 'santa fe', 'saab', 'saturn', 'savana', 'scion', 'scrambler', 'seat', 'sedan', 'seltos', 'sentra', 'sequoia', 'seville', 'sienna', 'sierra', 'silverado', 'skoda', 'sl', 'slk', 'smart', 'solara', 'solstice', 'sonata', 'sonic', 'sorento', 'soul', 'spark', 'spectra', 'spider', 'sport', 'sportage', 'sprinter', 'spyder', 'sq5', 'sq7', 'sq8', 'srx', 'ss', 'stelvio', 'stinger', 'sti', 'strada', 'stratus', 'sts', 'studebaker', 'subaru', 'suburban', 'suv', 'suzuki', 'swift', 'sx4',
  // T
  't-cross', 't-roc', 'tacoma', 'tahoe', 'taos', 'taurus', 'taycan', 'telluride', 'tercel', 'terrain', 'tesla', 'thunderbird', 'tiguan', 'titan', 'tlx', 'touareg', 'touring', 'town car', 'toyota', 'tracker', 'trailblazer', 'trailhawk', 'transit', 'traverse', 'tribute', 'truck', 'trx', 'tsi', 'tt', 'tucson', 'tundra', 'turbo',
  // U
  'urus', 'utility',
  // V
  'v40', 'v50', 'v60', 'v8', 'v90', 'van', 'vanquish', 'vauxhall', 'vega', 'veloster', 'venom', 'venza', 'veracruz', 'verna', 'verano', 'verso', 'vette', 'veyron', 'vibe', 'viper', 'vito', 'volkswagen', 'volvo', 'vw',
  // W
  'wagon', 'wagoneer', 'willys', 'windstar', 'wrangler', 'wrx',
  // X
  'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'xa', 'xb', 'xc40', 'xc60', 'xc90', 'xe', 'xf', 'xj', 'xjl', 'xk', 'xkr', 'xlr', 'xr', 'xt4', 'xt5', 'xt6', 'xts', 'xv',
  // Y
  'yaris', 'yukon',
  // Z
  'z', 'z3', 'z4', 'z06', 'z28', 'zafira', 'zdx', 'zephyr', 'zl1',
]);

// ============================================
// SPORTS & GAMES DATABASE - Comprehensive list of sports, games, and athletic activities
// ============================================
export const SPORTS_GAMES_SET = new Set<string>([
  // A - Sports, Games, Athletic Activities
  'acrobatics', 'aerobics', 'aikido', 'air hockey', 'airsoft', 'american football', 'angling', 'apples to apples', 'aquatics', 'archery', 'arm wrestling', 'athletics', 'australian football', 'australian rules football', 'auto racing',
  // B
  'backgammon', 'badminton', 'bait and switch', 'balance beam', 'ball', 'ballet', 'ballooning', 'bandy', 'baseball', 'basketball', 'battleship', 'beach volleyball', 'biathalon', 'biathlon', 'bicycling', 'billiards', 'bingo', 'blackjack', 'blind man bluff', 'bmx', 'bmx racing', 'board game', 'bobsled', 'bobsledding', 'bocce', 'bocce ball', 'bodyboarding', 'bodybuilding', 'boggle', 'bowling', 'box lacrosse', 'boxing', 'bridge', 'broomball', 'bull riding', 'bungee jumping', 'bunny hop',
  // C
  'caber toss', 'calisthenics', 'camogie', 'canoeing', 'canopy piloting', 'capture the flag', 'car racing', 'card game', 'card games', 'cards', 'catch', 'charades', 'checkers', 'cheerleading', 'chess', 'climbing', 'clue', 'cluedo', 'coin toss', 'connect four', 'cornhole', 'crane game', 'crazy eights', 'cricket', 'croquet', 'cross country', 'cross country running', 'cross country skiing', 'crossfit', 'curling', 'cycling',
  // D
  'dance', 'dancing', 'darts', 'decathlon', 'dice', 'discus', 'disc golf', 'diving', 'dodgeball', 'dominoes', 'double dutch', 'downhill skiing', 'dragonboat', 'dragon boat racing', 'draughts', 'dressage', 'duck duck goose', 'dunk tank',
  // E
  'eight ball', 'equestrian', 'eskrima', 'esports', 'eventing', 'exercise',
  // F
  'fantasy football', 'fencing', 'field hockey', 'figure skating', 'fishing', 'fitness', 'flag football', 'floor exercise', 'floor hockey', 'foosball', 'football', 'formula one', 'four square', 'foursquare', 'free climbing', 'free diving', 'free running', 'freestyle skiing', 'freestyle swimming', 'freeze dance', 'freeze tag', 'frisbee', 'frisbee golf', 'futsal',
  // G
  'gaelic football', 'gin rummy', 'go', 'go fish', 'go kart', 'go kart racing', 'goal ball', 'goalball', 'golf', 'greco roman wrestling', 'greyhound racing', 'gymnastics',
  // H
  'hacky sack', 'half pipe', 'hammer throw', 'handball', 'handstand', 'hang gliding', 'hangman', 'hearts', 'heptathlon', 'hide and seek', 'high dive', 'high jump', 'hiking', 'hockey', 'hopscotch', 'horse racing', 'horse riding', 'horseback riding', 'horseshoes', 'hot potato', 'hula hoop', 'hula hooping', 'hunting', 'hurdles', 'hurling',
  // I
  'ice climbing', 'ice dancing', 'ice hockey', 'ice skating', 'indoor soccer', 'inline hockey', 'inline skating',
  // J
  'jacks', 'jai alai', 'javelin', 'jenga', 'jet skiing', 'jigsaw puzzle', 'jogging', 'jousting', 'judo', 'jujitsu', 'jump ball', 'jump rope', 'jumping', 'jumping jacks',
  // K
  'kabaddi', 'karate', 'kayak polo', 'kayaking', 'kendo', 'kickball', 'kickboxing', 'king of the hill', 'kiteboarding', 'kite flying', 'kite surfing', 'kitesurfing', 'knife throwing', 'kung fu',
  // L
  'lacrosse', 'laser tag', 'lawn bowling', 'lawn darts', 'leapfrog', 'lethwei', 'life', 'limbo', 'log rolling', 'long distance running', 'long jump', 'ludo', 'luge',
  // M
  'mah jong', 'mahjong', 'mancala', 'marathon', 'marbles', 'martial arts', 'medley relay', 'mini golf', 'mixed martial arts', 'mma', 'modern pentathlon', 'monopoly', 'motocross', 'motor racing', 'motorcross', 'motorcycle racing', 'mountain biking', 'mountain climbing', 'mountaineering', 'mother may i', 'muay thai', 'musical chairs', 'musical statues',
  // N
  'nascar', 'netball', 'nine ball', 'ninepins', 'ninjutsu',
  // O
  'obstacle course', 'old maid', 'olympics', 'one on one', 'operation', 'orienteering', 'othello',
  // P
  'paddleball', 'paddleboarding', 'paintball', 'pairs skating', 'pallone', 'parachuting', 'parallel bars', 'parcheesi', 'parkour', 'pass the parcel', 'pass the pig', 'pato', 'pentathlon', 'petanque', 'pictionary', 'pickleball', 'pilates', 'pin the tail', 'pinball', 'ping pong', 'platform diving', 'poker', 'pole vault', 'pole vaulting', 'polo', 'pommel horse', 'pong', 'pool', 'powerlifting', 'power walking', 'pro wrestling', 'putt putt', 'puzzles',
  // Q
  'quidditch', 'quoits',
  // R
  'race walking', 'racewalking', 'racing', 'racquetball', 'rafting', 'rally racing', 'rappelling', 'red light green light', 'red rover', 'relay', 'relay race', 'rhythmic gymnastics', 'ring around the rosie', 'ring toss', 'rings', 'risk', 'road cycling', 'road racing', 'rock climbing', 'rock paper scissors', 'rodeo', 'roller derby', 'roller hockey', 'roller skating', 'rollerblading', 'rowing', 'rugby', 'rugby league', 'rugby union', 'rummy', 'running',
  // S
  'sack race', 'sailing', 'sambo', 'sardines', 'scavenger hunt', 'scrabble', 'scuba diving', 'sepak takraw', 'seven card stud', 'shooting', 'short track', 'shot put', 'showjumping', 'shuffleboard', 'simon says', 'skateboarding', 'skating', 'skeet shooting', 'skeleton', 'ski jumping', 'skiing', 'skipping', 'skipping rope', 'skittles', 'sky diving', 'skydiving', 'slalom', 'sled', 'sledding', 'slingshot', 'slot machine', 'snooker', 'snorkeling', 'snowball fight', 'snowboarding', 'snowmobile racing', 'snowshoeing', 'soccer', 'softball', 'solitaire', 'sorry', 'spades', 'speed skating', 'speedball', 'spinning', 'spoons', 'sport', 'sports', 'sprint', 'sprinting', 'squash', 'stand up paddle', 'steeplechase', 'step aerobics', 'still rings', 'stock car racing', 'stoolball', 'street hockey', 'stretching', 'sumo', 'sumo wrestling', 'sup', 'surfing', 'swimming', 'synchronized diving', 'synchronized swimming',
  // T
  'table football', 'table tennis', 'tae kwon do', 'taekwondo', 'tag', 'tai chi', 'target shooting', 'team handball', 'telephone', 'ten pin bowling', 'tennis', 'tetherball', 'texas hold em', 'throwing', 'tic tac toe', 'tiger and goat', 'touch football', 'touch rugby', 'track', 'track and field', 'trampoline', 'trampolining', 'trap shooting', 'trapshooting', 'trekking', 'triathlon', 'trick or treat', 'triple jump', 'trivia', 'trivial pursuit', 'tug of war', 'tumbling', 'twenty one', 'twister',
  // U
  'ultimate', 'ultimate frisbee', 'underwater hockey', 'underwater rugby', 'unicycle', 'uno', 'uneven bars',
  // V
  'vault', 'vaulting', 'video game', 'video games', 'volleyball',
  // W
  'wakeboarding', 'walking', 'wall ball', 'war', 'water aerobics', 'water polo', 'water skiing', 'waterskiing', 'weightlifting', 'whack a mole', 'whiffleball', 'white water rafting', 'windsurfing', 'wing chun', 'winter sports', 'wrestling', 'wushu',
  // X
  'x games', 'xbox',
  // Y
  'yacht racing', 'yachting', 'yahtzee', 'yard games', 'yoga',
  // Z
  'ziplining', 'zorbing', 'zumba',
]);

// ============================================
// FRUITS & VEGETABLES DATABASE
// ============================================
export const FRUITS_VEGETABLES_SET = new Set<string>([
  // A
  'acai', 'acai berry', 'acorn', 'acorn squash', 'adzuki bean', 'agave', 'alfalfa', 'alfalfa sprouts', 'almond', 'amaranth', 'ambarella', 'anise', 'anjou pear', 'apple', 'apricot', 'arrowroot', 'artichoke', 'arugula', 'asian pear', 'asparagus', 'aubergine', 'avocado',
  // B
  'bamboo shoots', 'banana', 'banana pepper', 'barley', 'basil', 'bay leaf', 'bean', 'bean sprouts', 'beet', 'beet greens', 'beetroot', 'bell pepper', 'bergamot', 'berry', 'bibb lettuce', 'bilberry', 'bitter melon', 'black bean', 'black cherry', 'black currant', 'black pepper', 'black-eyed pea', 'blackberry', 'blackcurrant', 'blood orange', 'blueberry', 'bok choy', 'borage', 'boston lettuce', 'boysenberry', 'brazil nut', 'breadfruit', 'broad bean', 'broccoli', 'broccoli rabe', 'broccolini', 'brussels sprout', 'buckwheat', 'butter bean', 'butter lettuce', 'butternut', 'butternut squash',
  // C
  'cabbage', 'cacao', 'cactus', 'cactus pear', 'cantaloupe', 'caper', 'carambola', 'caraway', 'cardamom', 'cardoon', 'carob', 'carrot', 'cashew', 'cassava', 'cauliflower', 'cayenne', 'celeriac', 'celery', 'celery root', 'celtuce', 'chamomile', 'chard', 'chayote', 'cherimoya', 'cherry', 'cherry tomato', 'chervil', 'chestnut', 'chia', 'chickpea', 'chicory', 'chili', 'chili pepper', 'chinese cabbage', 'chinese spinach', 'chive', 'cilantro', 'cinnamon', 'citron', 'citrus', 'clementine', 'cloudberry', 'clove', 'cob', 'cocoa', 'coconut', 'collard', 'collard greens', 'corn', 'corn on the cob', 'coriander', 'cos lettuce', 'cowpea', 'crabapple', 'cranberry', 'cress', 'cucumber', 'cumin', 'currant', 'custard apple',
  // D
  'daikon', 'damson', 'dandelion', 'dandelion greens', 'date', 'delicata squash', 'dewberry', 'dill', 'dragon fruit', 'dragonfruit', 'dried fruit', 'durian',
  // E
  'edamame', 'edible flower', 'egg fruit', 'eggplant', 'elderberry', 'elephant garlic', 'endive', 'english pea', 'escarole',
  // F
  'fava bean', 'feijoa', 'fennel', 'fenugreek', 'fiddlehead', 'fiddlehead fern', 'fig', 'fingerling potato', 'flat bean', 'flax', 'flaxseed', 'forbidden rice', 'french bean', 'frisee', 'fruit',
  // G
  'gala apple', 'galangal', 'garam masala', 'garbanzo bean', 'garden pea', 'garlic', 'gem squash', 'ghost pepper', 'ginger', 'gingko', 'globe artichoke', 'gobo', 'golden apple', 'golden beet', 'gooseberry', 'gourds', 'grain', 'grape', 'grapefruit', 'grapes', 'green apple', 'green bean', 'green grape', 'green onion', 'green pea', 'green pepper', 'greens', 'guava',
  // H
  'habanero', 'hazelnut', 'head lettuce', 'heart of palm', 'herb', 'hibiscus', 'hickory nut', 'hominy', 'honey', 'honeydew', 'honeydew melon', 'horseradish', 'hot pepper', 'huckleberry', 'hubbard squash',
  // I
  'iceberg', 'iceberg lettuce', 'inca berry',
  // J
  'jaboticaba', 'jackfruit', 'jalapeno', 'jam fruit', 'java plum', 'jerusalem artichoke', 'jicama', 'jostaberry', 'jujube', 'juniper berry',
  // K
  'kabocha', 'kabocha squash', 'kaffir lime', 'kale', 'kamut', 'kelp', 'key lime', 'kidney bean', 'kiwano', 'kiwi', 'kiwifruit', 'kohlrabi', 'komatsuna', 'kumquat',
  // L
  'lamb lettuce', 'langsat', 'lavender', 'leaf lettuce', 'leek', 'legume', 'lemon', 'lemon balm', 'lemon grass', 'lemongrass', 'lentil', 'lettuce', 'lima bean', 'lime', 'lingonberry', 'loganberry', 'longan', 'loquat', 'lotus root', 'luffa', 'lychee',
  // M
  'macadamia', 'mache', 'mandarin', 'mandarin orange', 'mango', 'mangosteen', 'marjoram', 'marrow', 'medjool date', 'melon', 'mesclun', 'microgreens', 'millet', 'mint', 'miracle fruit', 'mizuna', 'morel', 'moringa', 'mulberry', 'mung bean', 'mung bean sprouts', 'mushroom', 'musk melon', 'mustard', 'mustard greens', 'mustard seed',
  // N
  'naan', 'napa cabbage', 'nashi pear', 'nasturtium', 'navel orange', 'navy bean', 'nectarine', 'nettles', 'noni', 'nopales', 'nori', 'nut', 'nutmeg',
  // O
  'oak leaf lettuce', 'oat', 'oatmeal', 'okra', 'olive', 'onion', 'orange', 'oranges', 'oregano', 'orzo',
  // P
  'pak choi', 'papaya', 'paprika', 'parsley', 'parsnip', 'pasilla pepper', 'passion fruit', 'pattypan squash', 'pea', 'pea pod', 'pea shoot', 'peach', 'peanut', 'pear', 'pearl onion', 'pecan', 'pepper', 'peppercorn', 'peppermint', 'persimmon', 'physalis', 'pickle', 'pine nut', 'pineapple', 'pink grapefruit', 'pinto bean', 'pistachio', 'pitaya', 'plantain', 'plum', 'plumcot', 'poblano', 'poi', 'pomegranate', 'pomelo', 'popcorn', 'poppy seed', 'portobello', 'potato', 'prawn', 'prickly pear', 'prune', 'pumpkin', 'pumpkin seed', 'purple cabbage', 'purslane',
  // Q
  'quandong', 'queen anne cherry', 'quince', 'quinoa',
  // R
  'radicchio', 'radish', 'raisin', 'rambutan', 'rapeseed', 'rapini', 'raspberry', 'red bean', 'red cabbage', 'red currant', 'red grape', 'red onion', 'red pepper', 'rhubarb', 'rice', 'rocket', 'romaine', 'romaine lettuce', 'romanesco', 'root vegetable', 'rose hip', 'rosemary', 'russet potato', 'rutabaga', 'rye',
  // S
  'saffron', 'sage', 'salad', 'salak', 'salal berry', 'salsify', 'sapodilla', 'sapote', 'satsuma', 'savory', 'scallion', 'scorzonera', 'sea bean', 'seaweed', 'serrano pepper', 'sesame', 'shallot', 'shiitake', 'shiso', 'sloe', 'snow pea', 'snap pea', 'sorrel', 'soursop', 'soy', 'soybean', 'spaghetti squash', 'spearmint', 'spinach', 'split pea', 'spring onion', 'sprout', 'squash', 'star anise', 'star apple', 'star fruit', 'starfruit', 'stevia', 'stone fruit', 'strawberry', 'string bean', 'sugar', 'sugar apple', 'sugar beet', 'sugar snap pea', 'sultana', 'summer squash', 'sunflower seed', 'sunchoke', 'sweet corn', 'sweet pea', 'sweet pepper', 'sweet potato', 'sweetcorn', 'swiss chard',
  // T
  'tamarillo', 'tamarind', 'tangelo', 'tangerine', 'taro', 'tarragon', 'tayberry', 'tea', 'thai basil', 'thyme', 'tomatillo', 'tomato', 'tree tomato', 'truffle', 'tuber', 'turmeric', 'turnip', 'turnip greens',
  // U
  'ube', 'udon', 'ugli', 'ugli fruit', 'ulluco', 'upland cress',
  // V
  'vanilla', 'vegetable', 'velvet bean', 'vidalia onion', 'vine', 'vine tomato', 'vinegar',
  // W
  'wakame', 'walnut', 'wasabi', 'water chestnut', 'water spinach', 'watercress', 'watermelon', 'wax bean', 'wax pepper', 'wheat', 'white asparagus', 'white bean', 'white grape', 'white mushroom', 'white onion', 'white pepper', 'white potato', 'wild rice', 'winter melon', 'winter squash', 'wonton', 'wood ear mushroom',
  // X
  'xigua', 'ximenia',
  // Y
  'yam', 'yam bean', 'yard long bean', 'yarrow', 'yellow bean', 'yellow onion', 'yellow pepper', 'yellow squash', 'youngberry', 'yuca', 'yukon gold', 'yuzu',
  // Z
  'za atar', 'zapote', 'zest', 'zucchini', 'zucchini squash',
]);

// ============================================
// BRANDS DATABASE - Companies and products
// ============================================
export const BRANDS_SET = new Set<string>([
  // A
  '3m', 'aaa', 'abb', 'abc', 'abercrombie', 'abercrombie and fitch', 'absolut', 'accenture', 'ace', 'acer', 'activision', 'adidas', 'adobe', 'aeg', 'aetna', 'aflac', 'agfa', 'airbnb', 'airbus', 'airwick', 'ajax', 'aldi', 'alfa romeo', 'alibaba', 'allstate', 'almond joy', 'alpha romeo', 'amazon', 'amd', 'american airlines', 'american eagle', 'american express', 'amex', 'amway', 'android', 'anheuser busch', 'anthropologie', 'aol', 'apex', 'apple', 'applebee', 'aquafina', 'aramco', 'arby', 'arcteryx', 'arden', 'ariat', 'arm', 'armani', 'asda', 'asics', 'aston martin', 'at&t', 'atari', 'atlantic', 'atlas', 'att', 'audi', 'audible', 'aveeno', 'avery', 'avis', 'avon', 'axe',
  // B
  'babolat', 'bacardi', 'bain', 'ballantine', 'balmain', 'banana republic', 'band-aid', 'bandai', 'bang', 'barbie', 'barclays', 'bare minerals', 'barnes and noble', 'basf', 'bass', 'bass pro', 'bata', 'bayer', 'beats', 'bebe', 'bed bath and beyond', 'bell', 'ben & jerry', 'benetton', 'bentley', 'berkshire', 'best buy', 'best western', 'betty crocker', 'bic', 'bimbo', 'bing', 'birkenstock', 'bissell', 'black and decker', 'blackberry', 'blackrock', 'bloomingdale', 'blue apron', 'blu-ray', 'bmw', 'bobs', 'body shop', 'boeing', 'bols', 'bombardier', 'bon appetit', 'boohoo', 'booking', 'bose', 'boss', 'boston', 'bottega veneta', 'bounty', 'braun', 'bridgestone', 'brioni', 'brisk', 'brooks', 'brooks brothers', 'brother', 'bubba', 'bud', 'budweiser', 'bugatti', 'bulgari', 'bumble', 'burberry', 'burger king', 'burton', 'busch', 'bvlgari',
  // C
  'c&a', 'cabela', 'cadbury', 'cadillac', 'calvin klein', 'camelbak', 'camel', 'campbell', 'canada goose', 'canon', 'capital one', 'capri sun', 'car max', 'carhartt', 'caribou', 'carl jr', 'carlsberg', 'carmax', 'carnival', 'carrefour', 'carrier', 'cartier', 'casio', 'cat', 'caterpillar', 'cbs', 'celine', 'centurylink', 'champion', 'chanel', 'chaps', 'charmin', 'chase', 'cheerios', 'cheesecake factory', 'chef boyardee', 'chevrolet', 'chevy', 'chick-fil-a', 'chipotle', 'chiquita', 'chloe', 'chomps', 'chrysler', 'church', 'cigna', 'cinnabon', 'circle k', 'cisco', 'citibank', 'citigroup', 'citizen', 'ck', 'clarins', 'clarks', 'clorox', 'cnn', 'coach', 'coca-cola', 'coke', 'colgate', 'columbia', 'comcast', 'comme des garcons', 'conagra', 'converse', 'coors', 'corona', 'costco', 'cover girl', 'cox', 'craftsman', 'craigslist', 'crate and barrel', 'crayola', 'credit suisse', 'crest', 'crocs', 'crown', 'crvs', 'cuisinart', 'cvs',
  // D
  'dairy queen', 'dannon', 'dasani', 'david yurman', 'dawn', 'de beers', 'dell', 'deloitte', 'delta', 'denny', 'dermologica', 'deutsche bank', 'dewalt', 'dg', 'dhl', 'diageo', 'dial', 'dickies', 'diesel', 'dillard', 'dior', 'directv', 'discovery', 'disney', 'dkny', 'dockers', 'dodge', 'dole', 'dolce and gabbana', 'dollar general', 'dollar shave club', 'dollar tree', 'domino', 'don julio', 'donna karan', 'doordash', 'dorito', 'doritos', 'doubletree', 'dove', 'dow', 'dr pepper', 'dropbox', 'drury', 'dunhill', 'dunkin', 'dunlop', 'duolingo', 'duracell', 'dyson',
  // E
  'ea', 'ebay', 'ecco', 'economist', 'eddie bauer', 'effen', 'egg', 'eharmony', 'elan', 'electrolux', 'element', 'eli lilly', 'elizabeth arden', 'emirates', 'energizer', 'ensure', 'enterprise', 'epson', 'equifax', 'equinox', 'ericsson', 'espn', 'esprit', 'essie', 'estee lauder', 'etihad', 'etsy', 'euro', 'evian', 'expedia', 'express', 'exxon', 'exxonmobil',
  // F
  'facebook', 'fairfield', 'falcon', 'family dollar', 'fanta', 'faraday', 'fashion nova', 'fast company', 'fedex', 'fendi', 'ferrari', 'ferrero', 'fidelity', 'fila', 'firestone', 'firefox', 'fisher price', 'five guys', 'fjallraven', 'flickr', 'flonase', 'fnac', 'folgers', 'foot locker', 'ford', 'forever 21', 'fossil', 'four seasons', 'fox', 'foxconn', 'fragrancenet', 'frank', 'free people', 'freeport', 'friskies', 'frito lay', 'fruit of the loom', 'fuji', 'fujifilm', 'fujitsu', 'furla',
  // G
  'gallo', 'gap', 'garmin', 'gatorade', 'ge', 'geico', 'general electric', 'general mills', 'general motors', 'gentle giant', 'gerber', 'ghd', 'giant', 'gibson', 'gillette', 'giorgio armani', 'givenchy', 'glad', 'glade', 'glassdoor', 'glenlivet', 'gm', 'godiva', 'gold bond', 'goldfish', 'goldman sachs', 'good year', 'google', 'goodyear', 'gopro', 'gossip girl', 'graco', 'grand theft auto', 'grey goose', 'grindr', 'groupon', 'grubhub', 'gucci', 'guess', 'gulf',
  // H
  'h&m', 'h&r block', 'haagen-dazs', 'habitat', 'hagen', 'hallmark', 'halo', 'hampton inn', 'hanes', 'hankook', 'haribo', 'harley davidson', 'harrods', 'harry', 'hasbro', 'havaianas', 'hbo', 'head', 'head and shoulders', 'heineken', 'heinz', 'hello kitty', 'henkel', 'hennessy', 'herbalife', 'hermes', 'hershey', 'hertz', 'hess', 'hewlett packard', 'hilfiger', 'hilton', 'hisense', 'hitachi', 'hollister', 'home depot', 'homegoods', 'homewood suites', 'honda', 'honey', 'honeywell', 'hoover', 'hormel', 'hot topic', 'hotels', 'hp', 'hsbc', 'htc', 'huawei', 'hubspot', 'hugo boss', 'hulu', 'hummer', 'hummus', 'hunter', 'huntington', 'husqvarna', 'hyatt', 'hyundai',
  // I
  'ibm', 'icloud', 'iheartradio', 'ikea', 'imax', 'imdb', 'indeed', 'infiniti', 'ing', 'instagram', 'instacart', 'intel', 'intuit', 'iphone', 'ipod', 'itunes', 'ivory', 'izod',
  // J
  'j crew', 'jack daniel', 'jack in the box', 'jacuzzi', 'jagermeister', 'jaguar', 'jameson', 'jansport', 'jbl', 'jc penney', 'jcpenney', 'jd', 'jd sports', 'jeep', 'jello', 'jelly belly', 'jet', 'jetblue', 'jif', 'jiffy', 'jimmy choo', 'jimmy dean', 'jimmy john', 'jockey', 'john deere', 'john hancock', 'john lewis', 'johnson & johnson', 'johnnie walker', 'jollibee', 'jordan', 'jose cuervo', 'jp morgan', 'jpmorgan', 'juicy couture', 'jumbo', 'jvc',
  // K
  'kahlua', 'kaiser', 'kate spade', 'keds', 'keebler', 'kellogg', 'kelly', 'kenmore', 'kennett', 'kenzo', 'kfc', 'kia', 'kiehl', 'kindle', 'king', 'kirkland', 'kit kat', 'kitchen aid', 'kitchenaid', 'kleenex', 'klm', 'kmart', 'knorr', 'kodak', 'kohler', 'kohl', 'komatsu', 'kraft', 'krispy kreme', 'kroger',
  // L
  'la mer', 'la quinta', 'lacoste', 'lamborghini', 'lamps plus', 'lancome', 'land rover', 'lands end', 'lanvin', 'lays', 'lazy boy', 'le creuset', 'lean cuisine', 'lee', 'lego', 'lennar', 'lenovo', 'lenscrafters', 'levi', 'levis', 'lexmark', 'lexus', 'lg', 'life', 'lincoln', 'lindt', 'linkedin', 'lipton', 'little debbie', 'liz claiborne', 'llbean', 'loews', 'logitech', 'lois vuitton', 'longchamp', 'loreal', 'lotte', 'louis vuitton', 'lowe', 'lowes', 'lucent', 'lucky', 'lucky brand', 'luden', 'lufthansa', 'lululemon', 'lumix', 'luvs', 'lv', 'lyft',
  // M
  'm&m', 'macy', 'macys', 'mailchimp', 'makita', 'man united', 'mango', 'manolo blahnik', 'marc jacobs', 'marcella', 'mariott', 'marriott', 'mars', 'marshall', 'martha stewart', 'marvel', 'maserati', 'massage envy', 'mastercard', 'match', 'mattel', 'maui jim', 'max', 'max mara', 'maybach', 'maybelline', 'maytag', 'mazda', 'mazola', 'mcafee', 'mcdonald', 'mcdonalds', 'mckinsey', 'medtronic', 'meijer', 'meiji', 'melitta', 'mentos', 'mercedes', 'mercedes-benz', 'merck', 'merrill lynch', 'meta', 'michelin', 'mickey', 'micron', 'microsoft', 'mikimoto', 'miller', 'mini', 'miu miu', 'mizuno', 'mlb', 'mms', 'mobil', 'modelo', 'moen', 'moet', 'mohawk', 'moleskine', 'moncler', 'monster', 'mont blanc', 'montblanc', 'moody', 'morgan stanley', 'morningstar', 'mossberg', 'motel 6', 'motorola', 'mountain dew', 'mr clean', 'msn', 'mtv', 'mucinex', 'mulberry', 'must', 'mustang',
  // N
  'nabisco', 'nars', 'nasdaq', 'national geographic', 'nationwide', 'nature valley', 'nautica', 'nba', 'nbc', 'neff', 'nescafe', 'nestle', 'netflix', 'netgear', 'neutrogena', 'new balance', 'new york times', 'newegg', 'newport', 'newsweek', 'next', 'nextel', 'nfl', 'nhl', 'nice', 'nike', 'nikon', 'nintendo', 'nissan', 'nivea', 'nokia', 'nordstrom', 'north face', 'norton', 'norwegian', 'novartis', 'novo nordisk', 'nutella', 'nvidia', 'nyx',
  // O
  'oakley', 'oasis', 'oatly', 'oculus', 'off', 'office depot', 'ogilvy', 'oikos', 'old navy', 'old spice', 'oldsmobile', 'olay', 'olive garden', 'olympus', 'omega', 'oneplus', 'onstar', 'opel', 'oppo', 'optum', 'oracle', 'oral-b', 'orbitz', 'oreo', 'origin', 'origins', 'oscar', 'oscar mayer', 'oshkosh', 'otter', 'otterbox', 'outback', 'overstock', 'oxo', 'oxygen',
  // P
  'p&g', 'pa', 'pabst', 'pace', 'paco rabanne', 'palm', 'palmolive', 'pampers', 'panasonic', 'pandora', 'panera', 'papa john', 'paramount', 'parker', 'partylite', 'patagonia', 'patek philippe', 'patron', 'paul mitchell', 'payless', 'paypal', 'pbs', 'pelican', 'pepperidge farm', 'pepsi', 'perdue', 'perrier', 'persona', 'petsmart', 'petco', 'peugeot', 'pfizer', 'pg', 'philadelphia', 'philips', 'pier 1', 'piggly wiggly', 'pillsbury', 'pilot', 'pinduoduo', 'pinterest', 'pioneer', 'pirelli', 'pita', 'pixar', 'pizza hut', 'planet fitness', 'playboy', 'playstation', 'pledge', 'plum', 'plus', 'pnc', 'poco', 'polar', 'polaroid', 'polo', 'pond', 'pontiac', 'popeyes', 'porsche', 'post', 'pottery barn', 'power rangers', 'prada', 'prego', 'prestige', 'pret', 'prevage', 'price', 'priceline', 'prime', 'pringles', 'primark', 'princess', 'prudential', 'publix', 'puig', 'puma', 'purell', 'purina', 'pyrex',
  // Q
  'q-tips', 'qantas', 'quaker', 'qualcomm', 'quartz', 'queen', 'quest', 'quicken', 'quicksilver', 'quiksilver', 'quincy', 'quip', 'qvc',
  // R
  'ragu', 'raid', 'rainbow', 'ralph lauren', 'ram', 'ramada', 'range rover', 'ray-ban', 'raytheon', 'razer', 'rc cola', 'rca', 'reebok', 'reese', 'rei', 'remington', 'renault', 'restoration hardware', 'revlon', 'rexel', 'reynolds', 'ricoh', 'ring', 'rite aid', 'ritz', 'ritz carlton', 'robert bosch', 'robitussin', 'rockport', 'rockstar', 'roku', 'rolex', 'rolls royce', 'romwe', 'roper', 'ross', 'rover', 'royal caribbean', 'rubbermaid', 'russell', 'russell athletic', 'ryanair',
  // S
  'safeway', 'saint laurent', 'sake', 'saks', 'salvatore ferragamo', 'sam adams', 'sam club', 'samsonite', 'samsung', 'san pellegrino', 'sandisk', 'sanofi', 'sap', 'sara lee', 'saucony', 'schick', 'schlumberger', 'schweppes', 'scotch', 'seagate', 'seagram', 'sears', 'seat', 'sega', 'sephora', 'sesame street', 'seven eleven', 'seventh generation', 'shake shack', 'sharpie', 'shaw', 'sheetz', 'shell', 'sheraton', 'sherwin williams', 'shiseido', 'shopify', 'shopko', 'siemens', 'silk', 'simplicity', 'singer', 'siriusxm', 'sketch', 'sketchers', 'skoda', 'skullcandy', 'sky', 'slack', 'sleep number', 'slim jim', 'smirnoff', 'smithfield', 'snapchat', 'snapple', 'snickers', 'snoopy', 'snowflake', 'softbank', 'sony', 'sotheby', 'soundcloud', 'southwest', 'space x', 'spam', 'spanx', 'speedo', 'speedy', 'spencer', 'sperry', 'spotify', 'sprint', 'sprite', 'square', 'squarespace', 'sr', 'staples', 'star', 'starbuck', 'starbucks', 'starwood', 'state farm', 'steelcase', 'stella artois', 'stihl', 'stride rite', 'stripe', 'stuart weitzman', 'stubhub', 'studio', 'subaru', 'subway', 'sumitomo', 'sunbeam', 'sunglass hut', 'sunkist', 'suny', 'super 8', 'superdry', 'supreme', 'suzuki', 'swarovski', 'swatch', 'sweet', 'swiss', 'symantec',
  // T
  't-mobile', 'tab', 'taco bell', 'tag heuer', 'talbot', 'taobao', 'target', 'tata', 'taylormade', 'tcl', 'td', 'ted baker', 'tencent', 'tesla', 'texas instruments', 'tgi friday', 'the north face', 'thinkpad', 'thomas', 'thomson', 'thule', 'ti', 'tic tac', 'tiffany', 'tiger', 'tiktok', 'tillamook', 'timberland', 'timex', 'tinder', 'titleist', 'tj maxx', 'tjx', 'tmobile', 'tmz', 'tnt', 'todd', 'tods', 'toll brothers', 'tom ford', 'tom tom', 'tomtom', 'tommy hilfiger', 'toms', 'toni and guy', 'topman', 'topshop', 'toro', 'tory burch', 'toshiba', 'totino', 'tower', 'toyota', 'toys r us', 'trader joe', 'travelpro', 'travelocity', 'trek', 'trello', 'tresemme', 'tripadvisor', 'triumph', 'tropicana', 'true religion', 'trulia', 'trump', 'tumi', 'tumblr', 'tupperware', 'turkish airlines', 'turtle wax', 'twitch', 'twitter', 'tylenol', 'tyson',
  // U
  'uber', 'ubisoft', 'ucb', 'ugg', 'ulta', 'ultra', 'umbro', 'under armour', 'underwood', 'unilever', 'union pacific', 'united', 'united airlines', 'unity', 'ups', 'urban outfitters', 'usaa', 'usps',
  // V
  'v8', 'vale', 'valentino', 'van heusen', 'vanguard', 'vanilla', 'vans', 'vaseline', 'vault', 'veet', 'venmo', 'vera wang', 'verizon', 'versa', 'versace', 'vh1', 'viacom', 'vick', 'vicks', 'victor', 'victoria secret', 'victorinox', 'vidal sassoon', 'vimeo', 'virgin', 'visa', 'vistana', 'vitamin water', 'viva', 'vizio', 'vivo', 'vodafone', 'volkswagen', 'volvo', 'voss', 'vuitton', 'vw',
  // W
  'w hotel', 'waffle house', 'walgreens', 'walmart', 'warner', 'warner bros', 'warby parker', 'warren', 'wasabi', 'washington post', 'waterman', 'wawa', 'wayfair', 'wd-40', 'weber', 'wechat', 'weight watchers', 'weiser', 'welch', 'wells fargo', 'wendys', 'wendy', 'western union', 'westin', 'westinghouse', 'wework', 'whirlpool', 'white castle', 'whitman', 'whole foods', 'wii', 'wikipedia', 'williams sonoma', 'wimbledon', 'windows', 'wingstop', 'winnebago', 'winn dixie', 'winnie', 'winter', 'wisk', 'wish', 'wix', 'wonder bread', 'wordpress', 'world of warcraft', 'wrangler', 'wsj', 'wwe', 'wyndham',
  // X
  'xbox', 'xerox', 'xiaomi', 'xfinity', 'xm',
  // Y
  'yahoo', 'yakult', 'yamaha', 'yammer', 'yankee candle', 'yelp', 'yes', 'yeti', 'yfm', 'yoplait', 'ysl', 'yves saint laurent', 'youtube',
  // Z
  'zalando', 'zales', 'zappos', 'zara', 'zebra', 'zendesk', 'zenith', 'zephyr', 'zero', 'zildjian', 'zillow', 'zipcar', 'ziploc', 'zippo', 'zoom', 'zulily', 'zumba', 'zynga',
]);

// ============================================
// HEALTH ISSUES DATABASE - Medical conditions
// ============================================
export const HEALTH_ISSUES_SET = new Set<string>([
  // A
  'abscess', 'achalasia', 'achilles tendinitis', 'acne', 'acoustic neuroma', 'acromegaly', 'addiction', 'addison disease', 'adhd', 'adrenal fatigue', 'agoraphobia', 'aids', 'albinism', 'alcoholism', 'allergy', 'allergies', 'alopecia', 'als', 'altitude sickness', 'alzheimer', 'alzheimers', 'amenorrhea', 'amnesia', 'anaphylaxis', 'anemia', 'aneurysm', 'angina', 'angioedema', 'ankle sprain', 'ankylosing spondylitis', 'anorexia', 'anthrax', 'anxiety', 'aortic stenosis', 'aphasia', 'appendicitis', 'arrhythmia', 'arthritis', 'asbestosis', 'ascites', 'asperger', 'asthma', 'astigmatism', 'atherosclerosis', 'athlete foot', 'atopic dermatitis', 'atrial fibrillation', 'attention deficit', 'autism', 'autoimmune disease', 'avascular necrosis',
  // B
  'baby acne', 'back pain', 'backache', 'bacterial infection', 'balance disorder', 'barotrauma', 'barrett esophagus', 'basal cell carcinoma', 'bed bug', 'bed sore', 'bedsore', 'bell palsy', 'benign tumor', 'beriberi', 'bile duct cancer', 'binge eating', 'bipolar', 'bipolar disorder', 'birth defect', 'black eye', 'bladder cancer', 'bladder infection', 'bladder stone', 'bleeding', 'blepharitis', 'blindness', 'blister', 'bloating', 'blood cancer', 'blood clot', 'blood disorder', 'blood poisoning', 'blood pressure', 'blurred vision', 'body odor', 'boil', 'bone cancer', 'bone fracture', 'bone spur', 'botulism', 'bowel obstruction', 'brachial plexus injury', 'bradycardia', 'brain aneurysm', 'brain cancer', 'brain damage', 'brain fog', 'brain hemorrhage', 'brain tumor', 'breast cancer', 'breast cyst', 'breast lump', 'breast pain', 'breath', 'breathing difficulty', 'brittle bone', 'broken arm', 'broken bone', 'broken leg', 'broken nose', 'bronchiectasis', 'bronchiolitis', 'bronchitis', 'bruise', 'bruxism', 'bulging disc', 'bulimia', 'bunion', 'burn', 'burnout', 'bursitis',
  // C
  'c diff', 'calcification', 'calcium deficiency', 'callus', 'cancer', 'candida', 'canker sore', 'carbon monoxide poisoning', 'carcinoma', 'cardiac arrest', 'cardiac arrhythmia', 'cardiomegaly', 'cardiomyopathy', 'carotid artery disease', 'carpal tunnel', 'cartilage damage', 'cataract', 'cataracts', 'celiac', 'celiac disease', 'cellulitis', 'cerebral edema', 'cerebral palsy', 'cervical cancer', 'cervical stenosis', 'chafing', 'chalazion', 'charley horse', 'chest congestion', 'chest infection', 'chest pain', 'chicken pox', 'chickenpox', 'chilblain', 'chills', 'chlamydia', 'cholangitis', 'cholecystitis', 'cholera', 'cholesterol', 'chorea', 'chronic bronchitis', 'chronic fatigue', 'chronic kidney disease', 'chronic obstructive pulmonary disease', 'chronic pain', 'cirrhosis', 'claustrophobia', 'clubfoot', 'cluster headache', 'coarctation', 'cold', 'cold sore', 'colic', 'colitis', 'collapsed lung', 'colon cancer', 'colon polyp', 'color blindness', 'coma', 'common cold', 'compartment syndrome', 'concussion', 'congenital heart defect', 'congestive heart failure', 'conjunctivitis', 'constipation', 'contact dermatitis', 'copd', 'corn', 'corneal abrasion', 'corneal ulcer', 'coronary artery disease', 'coronavirus', 'costochondritis', 'cough', 'covid', 'covid-19', 'cramp', 'cramps', 'craniosynostosis', 'crohn', 'crohns', 'croup', 'cryptosporidiosis', 'cubital tunnel', 'cushing syndrome', 'cut', 'cyst', 'cystic acne', 'cystic fibrosis', 'cystitis', 'cytomegalovirus',
  // D
  'dandruff', 'deafness', 'deep vein thrombosis', 'dehydration', 'delayed growth', 'delirium', 'delusion', 'dementia', 'dengue', 'dental abscess', 'dental cavity', 'depression', 'dermatitis', 'dermatomyositis', 'detached retina', 'developmental delay', 'deviated septum', 'diabetes', 'diabetic neuropathy', 'diabetic retinopathy', 'diaper rash', 'diarrhea', 'digestive disorder', 'diphtheria', 'disc herniation', 'dislocation', 'dissociation', 'diverticulitis', 'diverticulosis', 'dizziness', 'double vision', 'down syndrome', 'drowsiness', 'drug addiction', 'dry eye', 'dry mouth', 'dry skin', 'dumping syndrome', 'duodenal ulcer', 'dupuytren contracture', 'dust allergy', 'dwarfism', 'dysentery', 'dysgraphia', 'dyslexia', 'dysmenorrhea', 'dyspepsia', 'dysphagia', 'dysplasia', 'dyspnea', 'dystonia', 'dysuria',
  // E
  'ear infection', 'ear pain', 'earache', 'eating disorder', 'ebola', 'eclampsia', 'eczema', 'edema', 'elbow pain', 'elevated liver enzymes', 'embolism', 'emphysema', 'encephalitis', 'endocarditis', 'endometrial cancer', 'endometriosis', 'enlarged heart', 'enlarged prostate', 'enlarged spleen', 'enteritis', 'eosinophilia', 'epicondylitis', 'epidermolysis bullosa', 'epididymitis', 'epiglottitis', 'epilepsy', 'epstein barr', 'erectile dysfunction', 'erosion', 'esophageal cancer', 'esophageal varices', 'esophagitis', 'essential tremor', 'eustachian tube dysfunction', 'exhaustion', 'exophthalmos', 'eye disorder', 'eye infection', 'eye inflammation', 'eye pain', 'eye strain', 'eye twitch',
  // F
  'facial paralysis', 'fainting', 'fallen arches', 'farsightedness', 'fasciculation', 'fasciitis', 'fat embolism', 'fatigue', 'fatty liver', 'fecal incontinence', 'fever', 'fibrillation', 'fibrocystic breast', 'fibroid', 'fibromyalgia', 'fibrosis', 'finger infection', 'fissure', 'fistula', 'flat feet', 'flatulence', 'floater', 'fluid retention', 'flu', 'folliculitis', 'food allergy', 'food intolerance', 'food poisoning', 'foot drop', 'foot pain', 'fracture', 'fragile x syndrome', 'freckle', 'frostbite', 'frozen shoulder', 'fungal infection', 'fungus',
  // G
  'gait disorder', 'gallbladder attack', 'gallbladder disease', 'gallstone', 'gallstones', 'ganglion cyst', 'gangrene', 'gas', 'gastric ulcer', 'gastritis', 'gastroenteritis', 'gastroesophageal reflux', 'gastroparesis', 'genital herpes', 'genital warts', 'gerd', 'german measles', 'gestational diabetes', 'giardiasis', 'gigantism', 'gilbert syndrome', 'gingivitis', 'glaucoma', 'glioblastoma', 'glioma', 'goiter', 'golfer elbow', 'gonorrhea', 'gout', 'granuloma', 'graves disease', 'groin pain', 'growth disorder', 'guillain barre', 'gum disease', 'gynecomastia',
  // H
  'hair loss', 'halitosis', 'hallucination', 'hammer toe', 'hamstring injury', 'hand foot mouth disease', 'hand tremor', 'hangover', 'hashimoto', 'hay fever', 'head injury', 'head lice', 'headache', 'hearing impairment', 'hearing loss', 'heart arrhythmia', 'heart attack', 'heart block', 'heart disease', 'heart failure', 'heart murmur', 'heart palpitation', 'heartburn', 'heat exhaustion', 'heat rash', 'heat stroke', 'heel pain', 'heel spur', 'hemangioma', 'hematoma', 'hematuria', 'hemochromatosis', 'hemodialysis', 'hemophilia', 'hemorrhage', 'hemorrhoid', 'hemorrhoids', 'hepatitis', 'hepatitis a', 'hepatitis b', 'hepatitis c', 'hernia', 'herniated disc', 'herpes', 'herpes simplex', 'herpes zoster', 'hiatal hernia', 'hiccup', 'hiccups', 'hidradenitis', 'high blood pressure', 'high cholesterol', 'hip bursitis', 'hip dysplasia', 'hip fracture', 'hip pain', 'hirsutism', 'histoplasmosis', 'hiv', 'hives', 'hoarseness', 'hodgkin lymphoma', 'hookworm', 'hormonal imbalance', 'hot flash', 'hpv', 'huntington', 'huntingtons', 'hydrocele', 'hydrocephalus', 'hydronephrosis', 'hyperactivity', 'hypercalcemia', 'hypercholesterolemia', 'hyperglycemia', 'hyperhidrosis', 'hyperkalemia', 'hyperlipidemia', 'hyperopia', 'hyperparathyroidism', 'hyperpigmentation', 'hyperplasia', 'hypertension', 'hyperthyroidism', 'hypertrichosis', 'hypertrophy', 'hyperventilation', 'hypoglycemia', 'hypokalemia', 'hyponatremia', 'hypoparathyroidism', 'hypopituitarism', 'hypotension', 'hypothermia', 'hypothyroidism', 'hypoxia', 'hysterectomy',
  // I
  'ibd', 'ibs', 'ichthyosis', 'idiopathic', 'ileitis', 'ileus', 'immune deficiency', 'impacted tooth', 'impetigo', 'impingement', 'impotence', 'incontinence', 'indigestion', 'infant jaundice', 'infection', 'infertility', 'inflammation', 'inflammatory bowel', 'influenza', 'ingrown hair', 'ingrown nail', 'ingrown toenail', 'inguinal hernia', 'injury', 'insect bite', 'insomnia', 'insulin resistance', 'interstitial cystitis', 'intestinal blockage', 'intestinal obstruction', 'intracranial pressure', 'intussusception', 'iritis', 'iron deficiency', 'irregular heartbeat', 'irritable bowel', 'irritable bowel syndrome', 'ischemia', 'ischemic stroke', 'itching', 'itp',
  // J
  'jaundice', 'jaw pain', 'jet lag', 'jock itch', 'joint dislocation', 'joint effusion', 'joint infection', 'joint inflammation', 'joint pain', 'joint stiffness', 'juvenile arthritis', 'juvenile diabetes',
  // K
  'kaposi sarcoma', 'kawasaki disease', 'keloid', 'keratitis', 'keratoconus', 'keratosis', 'keratosis pilaris', 'ketoacidosis', 'kidney cancer', 'kidney cyst', 'kidney disease', 'kidney failure', 'kidney infection', 'kidney stone', 'kidney stones', 'kleptomania', 'klinefelter syndrome', 'knee bursitis', 'knee injury', 'knee pain', 'knock knee', 'kyphosis',
  // L
  'labyrinthitis', 'lactose intolerance', 'large intestine cancer', 'laryngitis', 'lateral epicondylitis', 'lazy eye', 'lead poisoning', 'learning disability', 'leg cramp', 'leg pain', 'legg-calve-perthes', 'legionnaires', 'leishmaniasis', 'leprosy', 'lesion', 'lethargy', 'leukemia', 'leukocytosis', 'leukoplakia', 'lice', 'lichen planus', 'ligament tear', 'lightheadedness', 'lipedema', 'lipoma', 'listeriosis', 'liver cancer', 'liver cirrhosis', 'liver damage', 'liver disease', 'liver failure', 'lockjaw', 'long qt syndrome', 'lordosis', 'loss of appetite', 'loss of hearing', 'loss of vision', 'lou gehrig', 'low back pain', 'low blood pressure', 'low blood sugar', 'low testosterone', 'lower back pain', 'lumbago', 'lumbar stenosis', 'lump', 'lung cancer', 'lung collapse', 'lung disease', 'lung infection', 'lung nodule', 'lupus', 'lyme', 'lyme disease', 'lymphadenitis', 'lymphadenopathy', 'lymphedema', 'lymphocytosis', 'lymphoma', 'lynch syndrome',
  // M
  'macular degeneration', 'malabsorption', 'malaria', 'male pattern baldness', 'malignant tumor', 'malnutrition', 'malocclusion', 'mania', 'marfan syndrome', 'mastitis', 'mastoiditis', 'measles', 'medial epicondylitis', 'medulloblastoma', 'melanoma', 'melasma', 'memory loss', 'meniere disease', 'meningioma', 'meningitis', 'meniscus tear', 'menopause', 'menorrhagia', 'menstrual cramp', 'menstrual disorder', 'menstrual pain', 'mental disorder', 'mental illness', 'meralgia paresthetica', 'mercury poisoning', 'mesenteric ischemia', 'mesothelioma', 'metabolic disorder', 'metabolic syndrome', 'metastasis', 'metatarsalgia', 'microcephaly', 'middle ear infection', 'migraine', 'mild cognitive impairment', 'miscarriage', 'mitral regurgitation', 'mitral stenosis', 'mitral valve prolapse', 'mold allergy', 'mole', 'molluscum', 'mononucleosis', 'mood disorder', 'morning sickness', 'morton neuroma', 'motion sickness', 'motor neuron disease', 'mouth cancer', 'mouth sore', 'mouth ulcer', 'mrsa', 'ms', 'mucositis', 'multiple myeloma', 'multiple sclerosis', 'mumps', 'muscle atrophy', 'muscle cramp', 'muscle pain', 'muscle spasm', 'muscle strain', 'muscle weakness', 'muscular dystrophy', 'myalgia', 'myasthenia gravis', 'mycosis', 'myelitis', 'myelodysplastic syndrome', 'myeloma', 'myocardial infarction', 'myocarditis', 'myofascial pain', 'myopia', 'myositis',
  // N
  'nail fungus', 'nail infection', 'narcolepsy', 'nasal congestion', 'nasal polyp', 'nausea', 'nearsightedness', 'neck pain', 'neck stiffness', 'necrosis', 'neonatal jaundice', 'nephritis', 'nephrolithiasis', 'nephrotic syndrome', 'nerve compression', 'nerve damage', 'nerve pain', 'nervousness', 'neural tube defect', 'neuralgia', 'neuroblastoma', 'neurodermatitis', 'neurofibromatosis', 'neurological disorder', 'neuroma', 'neuropathy', 'neurosis', 'night blindness', 'night sweats', 'night terror', 'nightmare', 'nipple discharge', 'nodule', 'non-hodgkin lymphoma', 'nonalcoholic fatty liver', 'noonan syndrome', 'norovirus', 'nose bleed', 'nosebleed', 'numbness', 'nut allergy', 'nystagmus',
  // O
  'obesity', 'obsessive compulsive', 'obsessive compulsive disorder', 'obstructive sleep apnea', 'ocd', 'ocular hypertension', 'oedema', 'oesophagitis', 'oligomenorrhea', 'onychomycosis', 'optic neuritis', 'oral cancer', 'oral thrush', 'orbital cellulitis', 'orchitis', 'orthopnea', 'orthostatic hypotension', 'osgood-schlatter', 'osteoarthritis', 'osteochondritis', 'osteoma', 'osteomalacia', 'osteomyelitis', 'osteonecrosis', 'osteopenia', 'osteoporosis', 'osteosarcoma', 'otitis', 'otitis externa', 'otitis media', 'otosclerosis', 'ovarian cancer', 'ovarian cyst', 'ovarian torsion', 'overactive bladder', 'overflow incontinence', 'overweight', 'ovulation pain',
  // P
  'paget disease', 'pain', 'painful bladder', 'painful urination', 'palsy', 'pancreatic cancer', 'pancreatitis', 'panic attack', 'panic disorder', 'papilloma', 'paralysis', 'paranoia', 'paraplegia', 'parasitic infection', 'paresthesia', 'parkinson', 'parkinsons', 'parotitis', 'patellofemoral syndrome', 'patent ductus arteriosus', 'pcos', 'peanut allergy', 'pectus excavatum', 'pelvic floor dysfunction', 'pelvic inflammatory', 'pelvic inflammatory disease', 'pelvic pain', 'pemphigus', 'penile cancer', 'peptic ulcer', 'perforated eardrum', 'perforated ulcer', 'pericardial effusion', 'pericarditis', 'periodontal disease', 'periodontitis', 'peripheral artery disease', 'peripheral neuropathy', 'peripheral vascular disease', 'peritonitis', 'pernicious anemia', 'personality disorder', 'pertussis', 'pes planus', 'petit mal seizure', 'peyronie disease', 'pharyngitis', 'phenylketonuria', 'phlebitis', 'phobia', 'photophobia', 'photosensitivity', 'pilonidal cyst', 'pinched nerve', 'pink eye', 'pinworm', 'pituitary adenoma', 'pituitary tumor', 'pityriasis rosea', 'placenta previa', 'plague', 'plaque', 'plantar fasciitis', 'plantar wart', 'pleurisy', 'pleuritis', 'pneumoconiosis', 'pneumonia', 'pneumothorax', 'poison ivy', 'poisoning', 'polio', 'poliomyelitis', 'polycystic kidney', 'polycystic ovary', 'polycythemia', 'polymyalgia', 'polymyositis', 'polyp', 'polyps', 'porphyria', 'post nasal drip', 'post-traumatic stress', 'postmenopausal bleeding', 'postpartum depression', 'potassium deficiency', 'prader-willi syndrome', 'precocious puberty', 'preeclampsia', 'pregnancy', 'pregnancy complication', 'premature birth', 'premature ejaculation', 'premenstrual syndrome', 'presbyopia', 'pressure sore', 'priapism', 'prickly heat', 'primary biliary cholangitis', 'proctitis', 'prostate cancer', 'prostate enlargement', 'prostatitis', 'protein deficiency', 'pruritus', 'pseudogout', 'psoriasis', 'psoriatic arthritis', 'psychosis', 'ptosis', 'ptsd', 'pubic lice', 'pulled muscle', 'pulmonary edema', 'pulmonary embolism', 'pulmonary fibrosis', 'pulmonary hypertension', 'pulpitis', 'pupil dilation', 'pyelonephritis',
  // Q
  'q fever', 'quadriplegia',
  // R
  'rabies', 'radiculopathy', 'ramsay hunt syndrome', 'rash', 'raynaud', 'raynauds', 'reactive arthritis', 'rectal bleeding', 'rectal cancer', 'rectal prolapse', 'recurrent miscarriage', 'red eye', 'reflex sympathetic dystrophy', 'reflux', 'refractive error', 'reiter syndrome', 'renal cancer', 'renal cell carcinoma', 'renal colic', 'renal failure', 'repetitive strain injury', 'respiratory distress', 'respiratory failure', 'respiratory infection', 'restless leg', 'restless leg syndrome', 'retinal detachment', 'retinal tear', 'retinitis', 'retinitis pigmentosa', 'retinoblastoma', 'retinopathy', 'rett syndrome', 'rheumatic fever', 'rheumatism', 'rheumatoid arthritis', 'rhinitis', 'rhinorrhea', 'rib fracture', 'rickets', 'ringworm', 'rosacea', 'roseola', 'rotator cuff injury', 'rotator cuff tear', 'rotavirus', 'rsv', 'rubella', 'runny nose', 'ruptured disc', 'ruptured eardrum', 'ruptured spleen',
  // S
  'sacroiliitis', 'salivary gland infection', 'salmonella', 'sarcoidosis', 'sarcoma', 'scabies', 'scalp psoriasis', 'scar', 'scarlet fever', 'schistosomiasis', 'schizophrenia', 'sciatica', 'scleroderma', 'scoliosis', 'scrotal swelling', 'scurvy', 'seasonal affective disorder', 'sebaceous cyst', 'seborrheic dermatitis', 'seizure', 'seizures', 'self harm', 'senility', 'separation anxiety', 'sepsis', 'septal defect', 'septic arthritis', 'septicemia', 'severe acute respiratory syndrome', 'sexually transmitted disease', 'sexually transmitted infection', 'shaking', 'shellfish allergy', 'shingles', 'shin splints', 'shock', 'short bowel syndrome', 'shortness of breath', 'shoulder bursitis', 'shoulder dislocation', 'shoulder pain', 'sickle cell', 'sickle cell anemia', 'sickle cell disease', 'sids', 'silicosis', 'sinus headache', 'sinus infection', 'sinusitis', 'sjogren syndrome', 'skin allergy', 'skin cancer', 'skin disorder', 'skin infection', 'skin lesion', 'skin rash', 'skin tag', 'skin ulcer', 'skull fracture', 'sleep apnea', 'sleep deprivation', 'sleep disorder', 'sleep paralysis', 'sleepwalking', 'slipped disc', 'small intestine cancer', 'smallpox', 'smell disorder', 'smoking', 'snoring', 'social anxiety', 'soft tissue injury', 'sore throat', 'speech disorder', 'sperm abnormality', 'spina bifida', 'spinal cord injury', 'spinal muscular atrophy', 'spinal stenosis', 'spleen enlargement', 'splenomegaly', 'spondylitis', 'spondylolisthesis', 'spondylosis', 'sports injury', 'sprain', 'squamous cell carcinoma', 'staph infection', 'staphylococcal infection', 'std', 'steatorrhea', 'stenosis', 'sti', 'stiff neck', 'stiffness', 'still disease', 'stomach ache', 'stomach cancer', 'stomach flu', 'stomach pain', 'stomach ulcer', 'stomachache', 'stomatitis', 'strabismus', 'strain', 'strep', 'strep throat', 'stress', 'stress fracture', 'stress incontinence', 'stretch mark', 'stridor', 'stroke', 'stutter', 'stuttering', 'stye', 'subarachnoid hemorrhage', 'subdural hematoma', 'substance abuse', 'sudden infant death', 'suicidal ideation', 'sunburn', 'sunstroke', 'swallowing difficulty', 'sweating', 'swelling', 'swine flu', 'swollen glands', 'swollen lymph nodes', 'syncope', 'syndrome', 'synovitis', 'syphilis', 'syringomyelia', 'systemic lupus',
  // T
  'tachycardia', 'tailbone pain', 'tapeworm', 'tarsal tunnel syndrome', 'taste disorder', 'tay-sachs', 'tb', 'tear duct blockage', 'teething', 'temporomandibular disorder', 'tendinitis', 'tendinopathy', 'tendon injury', 'tendonitis', 'tennis elbow', 'tenosynovitis', 'tension headache', 'testicular cancer', 'testicular pain', 'testicular torsion', 'tetanus', 'tetraplegia', 'thalassemia', 'thoracic outlet syndrome', 'throat cancer', 'throat infection', 'throat pain', 'thrombocytopenia', 'thrombophilia', 'thrombophlebitis', 'thrombosis', 'thrush', 'thumb arthritis', 'thyroid', 'thyroid cancer', 'thyroid disease', 'thyroid disorder', 'thyroid nodule', 'thyroiditis', 'tic', 'tic disorder', 'tick bite', 'tietze syndrome', 'tinea', 'tinea versicolor', 'tinnitus', 'tiredness', 'tmj', 'toe fracture', 'toe infection', 'toenail fungus', 'tongue cancer', 'tongue tie', 'tonsillitis', 'tonsil stone', 'tooth abscess', 'tooth decay', 'tooth infection', 'toothache', 'torn acl', 'torn ligament', 'torn meniscus', 'torn rotator cuff', 'torticollis', 'tourette', 'toxic shock', 'toxic shock syndrome', 'toxoplasmosis', 'tracheal stenosis', 'tracheitis', 'trachoma', 'transient ischemic attack', 'trauma', 'traumatic brain injury', 'tremor', 'trench foot', 'trichinosis', 'trichomoniasis', 'tricuspid regurgitation', 'trigeminal neuralgia', 'trigger finger', 'triglycerides', 'trisomy', 'tropical disease', 'tuberculosis', 'tuberous sclerosis', 'tumor', 'turner syndrome', 'typhoid', 'typhus',
  // U
  'ulcer', 'ulcerative colitis', 'umbilical hernia', 'underweight', 'unilateral hearing loss', 'upper respiratory infection', 'uremia', 'ureter stone', 'ureteral stricture', 'urethral stricture', 'urethritis', 'urge incontinence', 'urinary incontinence', 'urinary infection', 'urinary retention', 'urinary stone', 'urinary tract infection', 'urination difficulty', 'urticaria', 'uterine cancer', 'uterine fibroid', 'uterine polyp', 'uterine prolapse', 'uti', 'uveitis',
  // V
  'vaginal bleeding', 'vaginal cancer', 'vaginal discharge', 'vaginal dryness', 'vaginal infection', 'vaginal yeast infection', 'vaginismus', 'vaginitis', 'valvular heart disease', 'varicocele', 'varicose veins', 'vascular dementia', 'vascular disease', 'vasculitis', 'vasovagal syncope', 'venereal disease', 'venous insufficiency', 'ventricular fibrillation', 'ventricular septal defect', 'ventricular tachycardia', 'vertigo', 'vestibular disorder', 'viral gastroenteritis', 'viral hepatitis', 'viral infection', 'viral meningitis', 'viral pneumonia', 'vision loss', 'vision problem', 'vitamin a deficiency', 'vitamin b12 deficiency', 'vitamin d deficiency', 'vitamin deficiency', 'vitiligo', 'vocal cord dysfunction', 'vocal cord nodule', 'vocal cord paralysis', 'voice disorder', 'volvulus', 'vomiting', 'von willebrand', 'vulvar cancer', 'vulvodynia',
  // W
  'wart', 'warts', 'water retention', 'weakness', 'weaver syndrome', 'wegener granulomatosis', 'weight gain', 'weight loss', 'wernicke encephalopathy', 'west nile', 'west nile virus', 'wheat allergy', 'wheezing', 'whiplash', 'white blood cell disorder', 'whooping cough', 'wilms tumor', 'wilson disease', 'wisdom tooth pain', 'withdrawal', 'wolff-parkinson-white syndrome', 'worm infection', 'wound', 'wound infection', 'wrist fracture', 'wrist pain', 'wryneck',
  // X
  'xeroderma', 'xerophthalmia', 'xerosis', 'xerostomia', 'x-linked', 'xxy syndrome',
  // Y
  'yeast infection', 'yellow fever', 'yersinia',
  // Z
  'zenker diverticulum', 'zika', 'zollinger-ellison syndrome', 'zoonosis', 'zoster', 'zygomycosis',
]);
