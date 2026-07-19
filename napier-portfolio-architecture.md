# Napier Properties - Site Architecture

## File Structure

```mermaid
graph TD
    subgraph ROOT["/PyCharmMiscProject/"]
        INDEX[index.html<br/>Main Entry Point]
        RENT[rent.html<br/>Investment Analysis]

        subgraph CSS_DIR["/css/"]
            MAIN_CSS[main.css<br/>Core Variables & Reset]
            COMPONENTS_CSS[components.css<br/>Cards, Modals, Panels]
            GALLERY_CSS[gallery.css<br/>Photo Gallery Styles]
            RESPONSIVE_CSS[responsive.css<br/>Media Queries]
        end

        subgraph JS_DIR["/js/"]
            APP_JS[app.js<br/>Main App Controller]
            GALLERY_JS[gallery.js<br/>Gallery & Modal Logic]
            NAV_JS[navigation.js<br/>Sticky Nav & Scroll]
            CONTACT_JS[contact.js<br/>Contact Panel Toggle]
            DATA_JS[data.js<br/>Property Data Store]
        end

        subgraph IMAGES_DIR["/images/"]
            subgraph PROP1["/1045-patterson/"]
                P1_IMGS[15 images]
            end
            subgraph PROP2["/2511-napier/"]
                P2_IMGS[25 images<br/>front + back]
            end
            subgraph PROP3["/2525-napier-cottage/"]
                P3_IMGS[18 images]
            end
            subgraph PROP4["/2525-napier-ave/"]
                P4_IMGS[18 images]
            end
            subgraph PROP5["/2529-napier-ave/"]
                P5_IMGS[22 images]
            end
            subgraph PROP6["/2534-napier/"]
                P6_IMGS[28 images<br/>left + right]
            end
        end
    end

    INDEX --> CSS_DIR
    INDEX --> JS_DIR
    INDEX -.->|"links to"| RENT
```

## Component Hierarchy

```mermaid
graph TD
    subgraph PAGE[index.html]
        subgraph HEADER[Header Component]
            LOGO[Logo/Title]
            NAV[Navigation]
            NAV_PORTFOLIO[Portfolio Tab]
            NAV_INVESTMENT[Investment Tab]
            NAV_CONTACT[Contact Button]
        end

        subgraph HERO[Hero Section]
            HERO_TITLE[Napier Properties]
            HERO_SUBTITLE[Tagline]
            HERO_CTA[Scroll Indicator]
        end

        subgraph PORTFOLIO[Portfolio Section]
            CARD_GRID[Property Card Grid]
            CARD1[Card: 1045 Patterson]
            CARD2[Card: 2511 Napier]
            CARD3[Card: 2525 Cottage]
            CARD4[Card: 2525 Ave]
            CARD5[Card: 2529 Napier]
            CARD6[Card: 2534 Napier]
        end

        subgraph MODAL[Modal Gallery Component]
            MODAL_OVERLAY[Backdrop Overlay]
            MODAL_CONTENT[Content Container]
            MODAL_HEADER[Property Title + Close]
            MODAL_DESC[Description Panel<br/>Collapsible]
            MODAL_MAIN[Main Image Display]
            MODAL_THUMBS[Thumbnail Strip]
            MODAL_NAV[Prev/Next Arrows]
        end

        subgraph INVESTMENT[Investment Section]
            INV_LINK[Link to rent.html<br/>or Embedded iframe]
        end

        subgraph CONTACT_PANEL[Contact Panel]
            CONTACT_BTN[Floating Button]
            CONTACT_EXPANDED[Expanded Panel]
            CONTACT_EMAIL[Email: gnpropertygroup@gmail.com]
        end

        subgraph FOOTER[Footer]
            FOOTER_INFO[Copyright & Links]
        end
    end

    CARD_GRID --> CARD1
    CARD_GRID --> CARD2
    CARD_GRID --> CARD3
    CARD_GRID --> CARD4
    CARD_GRID --> CARD5
    CARD_GRID --> CARD6

    CARD1 -->|click| MODAL
    CARD2 -->|click| MODAL
    CARD3 -->|click| MODAL
    CARD4 -->|click| MODAL
    CARD5 -->|click| MODAL
    CARD6 -->|click| MODAL
```

## JavaScript Module Logic

```mermaid
flowchart TD
    subgraph APP[app.js - Main Controller]
        INIT[init]
        INIT --> LOAD_DATA[Load Property Data]
        INIT --> INIT_NAV[Initialize Navigation]
        INIT --> INIT_GALLERY[Initialize Gallery]
        INIT --> INIT_CONTACT[Initialize Contact]
        INIT --> RENDER_CARDS[Render Property Cards]
    end

    subgraph DATA[data.js - Property Store]
        PROPERTIES[properties array]
        PROPERTIES --> P_ID[id]
        PROPERTIES --> P_NAME[name]
        PROPERTIES --> P_ADDRESS[address]
        PROPERTIES --> P_DESC[description]
        PROPERTIES --> P_IMAGES[images array]
        PROPERTIES --> P_THUMB[thumbnail]

        GET_PROPERTY[getProperty by id]
        GET_ALL[getAllProperties]
    end

    subgraph GALLERY[gallery.js - Gallery Logic]
        OPEN_MODAL[openModal propertyId]
        CLOSE_MODAL[closeModal]
        NEXT_IMAGE[nextImage]
        PREV_IMAGE[prevImage]
        SET_IMAGE[setActiveImage index]
        RENDER_THUMBS[renderThumbnails]

        OPEN_MODAL --> GET_PROPERTY
        OPEN_MODAL --> RENDER_THUMBS
        OPEN_MODAL --> SET_IMAGE

        subgraph EVENTS[Event Listeners]
            KEY_ESC[Escape → closeModal]
            KEY_LEFT[ArrowLeft → prevImage]
            KEY_RIGHT[ArrowRight → nextImage]
            CLICK_OUTSIDE[Backdrop click → closeModal]
            THUMB_CLICK[Thumbnail click → setImage]
        end
    end

    subgraph NAV[navigation.js - Navigation Logic]
        STICKY[handleScroll]
        SMOOTH[smoothScrollTo section]
        ACTIVE[setActiveNavItem]
        TOGGLE_SECTION[toggleSection]

        STICKY --> ACTIVE
    end

    subgraph CONTACT[contact.js - Contact Panel]
        TOGGLE_PANEL[toggleContactPanel]
        OPEN_PANEL[openPanel]
        CLOSE_PANEL[closePanel]

        subgraph CONTACT_EVENTS[Events]
            BTN_CLICK[Button click → toggle]
            OUTSIDE_CLICK[Outside click → close]
        end
    end

    APP --> DATA
    APP --> GALLERY
    APP --> NAV
    APP --> CONTACT
```

## CSS Module Structure

```mermaid
flowchart TD
    subgraph MAIN[main.css]
        VARS[":root CSS Variables"]
        VARS --> COLOR_PRIMARY["--primary: #1a365d"]
        VARS --> COLOR_SECONDARY["--secondary: #2c5282"]
        VARS --> COLOR_ACCENT["--accent: #3182ce"]
        VARS --> COLOR_GLASS["--glass: rgba 255,255,255,0.1"]
        VARS --> SHADOW["--shadow-lg"]
        VARS --> BLUR["--blur: 10px"]

        RESET[CSS Reset]
        TYPOGRAPHY[Typography - Lato]
        BASE[Base Body Styles]
    end

    subgraph COMPONENTS[components.css]
        subgraph CARDS[Property Cards]
            CARD_BASE[.property-card]
            CARD_IMAGE[.card-image]
            CARD_OVERLAY[.card-overlay]
            CARD_TITLE[.card-title]
            CARD_HOVER[.card:hover effects]
        end

        subgraph PANELS[Panels]
            GLASS_PANEL[.glass-panel]
            VALUE_BOX[.value-box]
            METRIC_CARD[.metric-card]
        end

        subgraph BUTTONS[Buttons]
            BTN_PRIMARY[.btn-primary]
            BTN_GLASS[.btn-glass]
            BTN_ICON[.btn-icon]
        end

        subgraph NAVIGATION[Navigation]
            STICKY_NAV[.sticky-nav]
            NAV_LINK[.nav-link]
            NAV_ACTIVE[.nav-link.active]
        end
    end

    subgraph GALLERY_CSS[gallery.css]
        MODAL_OVERLAY[.modal-overlay]
        MODAL_CONTAINER[.modal-container]
        MODAL_IMAGE[.modal-image]
        THUMB_STRIP[.thumbnail-strip]
        THUMB_ITEM[.thumbnail-item]
        THUMB_ACTIVE[.thumbnail-item.active]
        ARROW_BTN[.gallery-arrow]
        CLOSE_BTN[.modal-close]

        subgraph ANIMATIONS[Animations]
            FADE_IN["@keyframes fadeIn"]
            SCALE_IN["@keyframes scaleIn"]
            SLIDE_UP["@keyframes slideUp"]
        end
    end

    subgraph RESPONSIVE[responsive.css]
        BP_MOBILE["@media max-width: 480px"]
        BP_TABLET["@media max-width: 768px"]
        BP_DESKTOP["@media max-width: 1024px"]
        BP_WIDE["@media min-width: 1200px"]
    end

    MAIN --> COMPONENTS
    MAIN --> GALLERY_CSS
    MAIN --> RESPONSIVE
```

## User Interaction Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Page
    participant C as Card
    participant M as Modal
    participant G as Gallery
    participant D as Data

    U->>P: Load Page
    P->>D: getAllProperties()
    D-->>P: properties[]
    P->>P: renderPropertyCards()

    U->>C: Click Property Card
    C->>G: openModal(propertyId)
    G->>D: getProperty(id)
    D-->>G: property data
    G->>M: Show Modal
    G->>G: renderThumbnails()
    G->>G: setActiveImage(0)
    M-->>U: Display Gallery

    U->>M: Click Next Arrow
    M->>G: nextImage()
    G->>G: setActiveImage(current + 1)
    M-->>U: Show Next Image

    U->>M: Click Thumbnail
    M->>G: setActiveImage(index)
    M-->>U: Show Selected Image

    U->>M: Press Escape / Click X
    M->>G: closeModal()
    G->>M: Hide Modal
    M-->>U: Return to Grid
```

## Contact Panel Flow

```mermaid
sequenceDiagram
    participant U as User
    participant B as Floating Button
    participant P as Contact Panel
    participant C as contact.js

    U->>B: Click Contact Button
    B->>C: toggleContactPanel()
    C->>P: Add .expanded class
    P-->>U: Panel slides up

    U->>U: Click outside panel
    U->>C: handleOutsideClick()
    C->>P: Remove .expanded class
    P-->>U: Panel slides down
```

## Data Structure

```mermaid
classDiagram
    class Property {
        +string id
        +string name
        +string address
        +string description
        +string thumbnail
        +string[] images
        +PropertyDetails details
    }

    class PropertyDetails {
        +number bedrooms
        +number bathrooms
        +number sqft
        +string type
        +number rent
    }

    class GalleryState {
        +string activePropertyId
        +number activeImageIndex
        +boolean isOpen
    }

    class ContactState {
        +boolean isExpanded
    }

    Property "1" --> "1" PropertyDetails
    GalleryState --> Property : references
```

## Build Order

```mermaid
gantt
    title Implementation Order
    dateFormat X
    axisFormat %s

    section Structure
    Create folder structure     :a1, 0, 1
    Create index.html skeleton  :a2, after a1, 2

    section CSS
    main.css variables & reset  :b1, after a2, 2
    components.css cards/panels :b2, after b1, 3
    gallery.css modal styles    :b3, after b2, 2
    responsive.css breakpoints  :b4, after b3, 1

    section JavaScript
    data.js property store      :c1, after a2, 2
    navigation.js               :c2, after c1, 1
    contact.js                  :c3, after c2, 1
    gallery.js modal logic      :c4, after c3, 3
    app.js main controller      :c5, after c4, 2

    section Content
    Collect property descriptions :d1, after c5, 2
    Copy/organize images          :d2, after d1, 2

    section Testing
    Test all features            :e1, after d2, 2
```
