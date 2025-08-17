/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons - only the ones actually used in the project */

// Solid icons (fas) - UI elements
import { 
  faClockRotateLeft,
  faFolder,
  faEnvelope,
  faDownload,
  faUpload,
  faTriangleExclamation,
  faRotateLeft,
  faRotateRight,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faUpDownLeftRight,
  faChevronRight,
  faChevronLeft,
  faTrash,
  faEdit,
  faXmarkCircle,
  faFloppyDisk,
  faGear,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

// Regular icons (far) - UI elements
import { 
  faBookmark 
} from '@fortawesome/free-regular-svg-icons'
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Brand icons (fab) - Social media and tech brands

/* add icons to the library */
library.add(
  // Solid icons
  faClockRotateLeft,
  faFolder,
  faEnvelope,
  faDownload,
  faUpload,
  faTriangleExclamation,
  faRotateLeft,
  faRotateRight,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faUpDownLeftRight,
  faChevronRight,
  faChevronLeft,
  faTrash,
  faEdit,
  faXmarkCircle,
  faFloppyDisk,
  faGear,
  faPlus,
  
  // Regular icons
  faBookmark,
  
  // Brand
  faInstagram,
  faGithub,
  faLinkedin
)

export default library
