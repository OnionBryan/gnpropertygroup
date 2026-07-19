/* ============================================
   DATA.JS - Property Data Store
   Architecture: data.js → navigation.js → contact.js → gallery.js → app.js

   Data Structure (from architecture):
   - Property: id, name, address, description, thumbnail, images[], details
   - PropertyDetails: bedrooms, bathrooms, sqft, type, rent
   - getProperty(id), getAllProperties()
   ============================================ */

/**
 * Property Data Store
 * Contains all property information for the portfolio
 */
const PropertyStore = (function() {
    'use strict';

    // ============================================
    // PROPERTY DATA
    // Images reference files in /images/{property-folder}/
    // Filenames verified against actual directory contents
    // ============================================
    const properties = [
        {
            id: '1045-patterson',
            name: '1045 Patterson St',
            address: '1045 Patterson St, Macon, GA',
            description: '2-bedroom, 1-bath home on 1.13 acres with a 2,868 sq ft warehouse. Zoned R3.',
            thumbnail: 'images/1045-patterson/1045 Patterson St.jpg',
            images: [
                'images/1045-patterson/1045 Patterson St.jpg',
                'images/1045-patterson/IMG_5710.jpeg',
                'images/1045-patterson/IMG_5732.jpeg',
                'images/1045-patterson/IMG_5733.jpeg',
                'images/1045-patterson/IMG_5736.jpeg',
                'images/1045-patterson/IMG_5737.jpeg',
                'images/1045-patterson/IMG_5739.jpeg',
                'images/1045-patterson/IMG_5740.jpeg',
                'images/1045-patterson/IMG_5741.jpeg',
                'images/1045-patterson/IMG_5742.jpeg',
                'images/1045-patterson/IMG_5747.jpeg',
                'images/1045-patterson/IMG_5750.jpeg',
                'images/1045-patterson/IMG_5808.jpeg',
                'images/1045-patterson/IMG_5810.jpeg',
                'images/1045-patterson/IMG_5812.jpeg'
            ],
            details: {
                bedrooms: 2,
                bathrooms: 1,
                sqft: 1000,
                warehouseSqft: 2868,
                type: 'Residential + Warehouse',
                zoning: 'R3',
                rent: 1600,
                lotSize: '1.13 acres'
            }
        },
        {
            id: '2511-napier',
            name: '2511 Napier Ave',
            address: '2511 Napier Ave, Macon, GA',
            description: 'Duplex built in 1910. Front unit: 2 bed, 2 bath, ~1,500 sq ft. Back unit: 1 bed, 1 bath, ~1,000 sq ft.',
            thumbnail: 'images/2511-napier/2511 Napier Ave.jpg',
            images: [
                'images/2511-napier/2511 Napier Ave.jpg',
                'images/2511-napier/2511napier.jpg',
                'images/2511-napier/porch.jpg',
                'images/2511-napier/backyard.jpg',
                'images/2511-napier/yard.jpg',
                'images/2511-napier/2511 garage.jpg',
                'images/2511-napier/living room.jpg',
                'images/2511-napier/living.jpg',
                'images/2511-napier/living2.jpg',
                'images/2511-napier/nook.jpg',
                'images/2511-napier/kitchen.jpg',
                'images/2511-napier/bedroom1.jpg',
                'images/2511-napier/bedroom2.jpg',
                'images/2511-napier/bedroom11.jpg',
                'images/2511-napier/bedroom22.jpg',
                'images/2511-napier/closet.jpg',
                'images/2511-napier/appliances.jpg',
                'images/2511-napier/builtin.jpg',
                'images/2511-napier/laundry hookups.jpg',
                'images/2511-napier/0002_1765729913_large.jpg',
                'images/2511-napier/0007_1700479542_large.jpg',
                'images/2511-napier/0008_623926216_large.jpg',
                'images/2511-napier/0009_2093773465_large.jpg',
                'images/2511-napier/0015_1999995006_large.jpg'
            ],
            details: {
                bedrooms: 3,
                bathrooms: 3,
                sqft: 2500,
                type: 'Duplex',
                yearBuilt: 1910,
                rent: 1750,
                units: {
                    front: { bedrooms: 2, bathrooms: 2, sqft: 1500 },
                    back: { bedrooms: 1, bathrooms: 1, sqft: 1000 }
                }
            }
        },
        {
            id: '2525-napier-cottage',
            name: '2525 Napier Cottage',
            address: '2525 Napier Ave (Cottage), Macon, GA',
            description: '1-bedroom, 1-bath cottage, approximately 1,000 sq ft. Located behind the main house at 2525 Napier Ave.',
            thumbnail: 'images/2525-napier-cottage/exterior front.png',
            images: [
                'images/2525-napier-cottage/exterior front.png',
                'images/2525-napier-cottage/living room.jpg',
                'images/2525-napier-cottage/livingroom.jpg',
                'images/2525-napier-cottage/living .jpg',
                'images/2525-napier-cottage/kitchen.jpg',
                'images/2525-napier-cottage/kitchen setup.jpg',
                'images/2525-napier-cottage/stove.jpg',
                'images/2525-napier-cottage/bedroom2.jpg',
                'images/2525-napier-cottage/bed.jpg',
                'images/2525-napier-cottage/bath.jpg',
                'images/2525-napier-cottage/bathroom.jpg',
                'images/2525-napier-cottage/bath shelf.jpg',
                'images/2525-napier-cottage/hallway.jpg',
                'images/2525-napier-cottage/desk.jpg',
                'images/2525-napier-cottage/table.jpg',
                'images/2525-napier-cottage/tv.jpg',
                'images/2525-napier-cottage/sofa.jpg',
                'images/2525-napier-cottage/313781504_569524228263984_7742677476468608689_n.jpg'
            ],
            details: {
                bedrooms: 1,
                bathrooms: 1,
                sqft: 1000,
                type: 'Cottage',
                rent: 1200
            }
        },
        {
            id: '2525-napier-ave',
            name: '2525 Napier Ave',
            address: '2525 Napier Ave, Macon, GA',
            description: '4-bedroom, 2.5-bath single family home built in 1910. 3,206 sq ft.',
            thumbnail: 'images/2525-napier-ave/2525 Napier Ave.jpg',
            images: [
                'images/2525-napier-ave/2525 Napier Ave.jpg',
                'images/2525-napier-ave/exterior.jpg',
                'images/2525-napier-ave/living room.png',
                'images/2525-napier-ave/diningroom.png',
                'images/2525-napier-ave/dining living.png',
                'images/2525-napier-ave/master bedroom.jpg',
                'images/2525-napier-ave/bedroom2.jpg',
                'images/2525-napier-ave/kenzies room.png',
                'images/2525-napier-ave/sams room.png',
                'images/2525-napier-ave/school room.png',
                'images/2525-napier-ave/office2.png',
                'images/2525-napier-ave/bath1.jpg',
                'images/2525-napier-ave/pinkbath.png',
                'images/2525-napier-ave/hallway.png',
                'images/2525-napier-ave/hallway.jpg',
                'images/2525-napier-ave/patio.jpg',
                'images/2525-napier-ave/kitchen2.png',
                'images/2525-napier-ave/kitchen3.png',
                'images/2525-napier-ave/36-W7A8015.jpg',
                'images/2525-napier-ave/37-W7A8020.jpg',
                'images/2525-napier-ave/38-W7A8025.jpg',
                'images/2525-napier-ave/39-W7A8030.jpg',
                'images/2525-napier-ave/40-W7A8035.jpg',
                'images/2525-napier-ave/41-W7A8040.jpg',
                'images/2525-napier-ave/42-W7A8045.jpg',
                'images/2525-napier-ave/43-W7A8050.jpg',
                'images/2525-napier-ave/44-W7A8055.jpg',
                'images/2525-napier-ave/45-W7A8060.jpg',
                'images/2525-napier-ave/46-W7A8065.jpg',
                'images/2525-napier-ave/47-W7A8070.jpg',
                'images/2525-napier-ave/48-W7A8075.jpg',
                'images/2525-napier-ave/49-W7A8080.jpg',
                'images/2525-napier-ave/50-W7A8085.jpg',
                'images/2525-napier-ave/51-W7A8090.jpg',
                'images/2525-napier-ave/52-W7A8095.jpg',
                'images/2525-napier-ave/53-W7A8100.jpg',
                'images/2525-napier-ave/54-W7A8105.jpg',
                'images/2525-napier-ave/55-W7A8110.jpg',
                'images/2525-napier-ave/56-W7A8112.jpg',
                'images/2525-napier-ave/57-W7A8117.jpg',
                'images/2525-napier-ave/84-5W7A8009.jpg',
                'images/2525-napier-ave/85-5W7A8010.jpg',
                'images/2525-napier-ave/86-5W7A8011.jpg',
                'images/2525-napier-ave/87-5W7A8012.jpg',
                'images/2525-napier-ave/88-5W7A8013.jpg'
            ],
            details: {
                bedrooms: 4,
                bathrooms: 2.5,
                sqft: 3206,
                type: 'Single Family',
                yearBuilt: 1910,
                rent: 1950
            }
        },
        {
            id: '2529-napier-ave',
            name: '2529 Napier Ave',
            address: '2529 Napier Ave, Macon, GA',
            description: '2-bedroom, 1-bath cottage, approximately 1,000 sq ft.',
            thumbnail: 'images/2529-napier-ave/front.jpg',
            images: [
                'images/2529-napier-ave/front.jpg',
                'images/2529-napier-ave/exterior.jpg',
                'images/2529-napier-ave/exterior door.jpg',
                'images/2529-napier-ave/porch.jpg',
                'images/2529-napier-ave/swing.jpg',
                'images/2529-napier-ave/hallway.jpg',
                'images/2529-napier-ave/hall.jpg',
                'images/2529-napier-ave/kitchen.jpg',
                'images/2529-napier-ave/bath1.jpg',
                'images/2529-napier-ave/bath2.jpg',
                'images/2529-napier-ave/shower.jpg',
                'images/2529-napier-ave/yard1.jpg',
                'images/2529-napier-ave/yard2.jpg',
                'images/2529-napier-ave/yard3.jpg',
                'images/2529-napier-ave/20251216_150955.jpg',
                'images/2529-napier-ave/20251216_151007.jpg',
                'images/2529-napier-ave/20251216_151027.jpg',
                'images/2529-napier-ave/20251216_151049.jpg',
                'images/2529-napier-ave/20251216_151113.jpg',
                'images/2529-napier-ave/20251216_151126.jpg',
                'images/2529-napier-ave/20251216_151143.jpg'
            ],
            details: {
                bedrooms: 2,
                bathrooms: 1,
                sqft: 1000,
                type: 'Cottage',
                rent: 1200
            }
        },
        {
            id: '2553-napier-ave',
            name: '2553 Napier Ave',
            address: '2553 Napier Ave, Macon, GA',
            description: 'Historic single-family home in the Napier Heights Historic District.',
            thumbnail: 'images/2553-Napier-Ave/72-5W7A7996.jpg',
            images: [
                'images/2553-Napier-Ave/72-5W7A7996.jpg',
                'images/2553-Napier-Ave/01-W7A7822.jpg',
                'images/2553-Napier-Ave/02-W7A7827.jpg',
                'images/2553-Napier-Ave/03-W7A7832.jpg',
                'images/2553-Napier-Ave/04-W7A7837.jpg',
                'images/2553-Napier-Ave/05-W7A7842.jpg',
                'images/2553-Napier-Ave/06-W7A7847.jpg',
                'images/2553-Napier-Ave/07-W7A7852.jpg',
                'images/2553-Napier-Ave/08-W7A7857.jpg',
                'images/2553-Napier-Ave/09-W7A7862.jpg',
                'images/2553-Napier-Ave/10-W7A7867.jpg',
                'images/2553-Napier-Ave/11-W7A7872.jpg',
                'images/2553-Napier-Ave/12-W7A7877.jpg',
                'images/2553-Napier-Ave/13-W7A7882.jpg',
                'images/2553-Napier-Ave/14-W7A7887.jpg',
                'images/2553-Napier-Ave/15-W7A7892.jpg',
                'images/2553-Napier-Ave/16-W7A7897.jpg',
                'images/2553-Napier-Ave/17-W7A7902.jpg',
                'images/2553-Napier-Ave/18-W7A7907.jpg',
                'images/2553-Napier-Ave/19-W7A7912.jpg',
                'images/2553-Napier-Ave/20-W7A7917.jpg',
                'images/2553-Napier-Ave/21-W7A7922.jpg',
                'images/2553-Napier-Ave/22-W7A7927.jpg',
                'images/2553-Napier-Ave/23-W7A7932.jpg',
                'images/2553-Napier-Ave/24-W7A7937.jpg',
                'images/2553-Napier-Ave/25-W7A7942.jpg',
                'images/2553-Napier-Ave/26-W7A7947.jpg',
                'images/2553-Napier-Ave/27-W7A7952.jpg',
                'images/2553-Napier-Ave/28-W7A7957.jpg',
                'images/2553-Napier-Ave/29-W7A7962.jpg',
                'images/2553-Napier-Ave/30-W7A7967.jpg',
                'images/2553-Napier-Ave/31-W7A7972.jpg',
                'images/2553-Napier-Ave/32-W7A7977.jpg',
                'images/2553-Napier-Ave/33-W7A7981.jpg',
                'images/2553-Napier-Ave/34-W7A7986.jpg',
                'images/2553-Napier-Ave/35-W7A7991.jpg',
                'images/2553-Napier-Ave/73-5W7A7998.jpg',
                'images/2553-Napier-Ave/74-5W7A7999.jpg',
                'images/2553-Napier-Ave/75-5W7A8000.jpg',
                'images/2553-Napier-Ave/76-5W7A8001.jpg',
                'images/2553-Napier-Ave/77-5W7A8002.jpg',
                'images/2553-Napier-Ave/78-5W7A8003.jpg',
                'images/2553-Napier-Ave/79-5W7A8004.jpg',
                'images/2553-Napier-Ave/80-5W7A8005.jpg',
                'images/2553-Napier-Ave/81-5W7A8006.jpg',
                'images/2553-Napier-Ave/82-5W7A8007.jpg',
                'images/2553-Napier-Ave/83-5W7A8008.jpg',
                'images/2553-Napier-Ave/89-2553-Cottage.jpg'
            ],
            details: {
                bedrooms: 5,
                bathrooms: 2.5,
                sqft: 3000,
                type: 'Single Family',
                rent: 2000
            }
        },
        {
            id: '2534-napier',
            name: '2534 Napier Ave',
            address: '2534 Napier Ave, Macon, GA',
            description: 'Duplex, 2,375 sq ft total. Left unit: 1 bed, 1 bath, 1,000 sq ft. Right unit: 3 bed, 1 bath, 1,375 sq ft.',
            thumbnail: 'images/2534-napier/2534 Napier Ave.jpg',
            images: [
                'images/2534-napier/2534 Napier Ave.jpg',
                'images/2534-napier/livingroom2.jpg',
                'images/2534-napier/IMG_5815.jpeg',
                'images/2534-napier/IMG_5818.jpeg',
                'images/2534-napier/IMG_5821.jpeg',
                'images/2534-napier/IMG_5823.jpeg',
                'images/2534-napier/IMG_5825.jpeg',
                'images/2534-napier/IMG_5829.jpeg',
                'images/2534-napier/IMG_5831.jpeg',
                'images/2534-napier/IMG_5832.jpeg',
                'images/2534-napier/IMG_5834.jpeg',
                'images/2534-napier/IMG_5837.jpeg',
                'images/2534-napier/IMG_5841.jpeg',
                'images/2534-napier/IMG_5844.jpeg',
                'images/2534-napier/IMG_5847.jpeg',
                'images/2534-napier/IMG_5849.jpeg',
                'images/2534-napier/486548502_10205291788790488_6261452845978795148_n.jpg',
                'images/2534-napier/486645844_10205291789110496_6144606259980387191_n.jpg',
                'images/2534-napier/486694880_10205291788710486_4326146159960443692_n.jpg',
                'images/2534-napier/486762239_10205291789630509_5929311007031456561_n.jpg',
                'images/2534-napier/487051268_10205291787230449_7195461423320042440_n.jpg',
                'images/2534-napier/487124591_10205291788990493_4424616422257270040_n.jpg',
                'images/2534-napier/487131895_10205291789310501_4980475881635180543_n.jpg',
                'images/2534-napier/487148990_10205291790350527_5396724941268975308_n.jpg',
                'images/2534-napier/487195588_10205291789910516_1137242019347666667_n.jpg',
                'images/2534-napier/487199232_10205291790310526_7567720513443396333_n.jpg',
                'images/2534-napier/487311469_10205291789230499_2931239515943292049_n.jpg',
                'images/2534-napier/487453541_10205291789350502_6644706843837707743_n.jpg'
            ],
            details: {
                bedrooms: 4,
                bathrooms: 2,
                sqft: 2375,
                type: 'Duplex',
                rent: 1925,
                units: {
                    left: { bedrooms: 1, bathrooms: 1, sqft: 1000 },
                    right: { bedrooms: 3, bathrooms: 1, sqft: 1375 }
                }
            }
        }
    ];

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Get a single property by ID
     * @param {string} id - Property ID
     * @returns {Object|null} Property object or null if not found
     */
    function getProperty(id) {
        return properties.find(property => property.id === id) || null;
    }

    /**
     * Get all properties
     * @returns {Array} Array of all property objects
     */
    function getAllProperties() {
        return [...properties]; // Return copy to prevent mutation
    }

    /**
     * Get property count
     * @returns {number} Total number of properties
     */
    function getPropertyCount() {
        return properties.length;
    }

    /**
     * Get total image count across all properties
     * @returns {number} Total number of images
     */
    function getTotalImageCount() {
        return properties.reduce((total, property) => total + property.images.length, 0);
    }

    // Expose public API
    return {
        getProperty,
        getAllProperties,
        getPropertyCount,
        getTotalImageCount
    };
})();

// Make available globally for other modules
window.PropertyStore = PropertyStore;
