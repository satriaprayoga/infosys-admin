import Countries from "../pages/countries/Countries";
import Destinations from "../pages/destinations/Destinations";
import CountryEditForm from "../pages/countries/CountryEditForm";
import CountryForm from "../pages/countries/CountryForm";
import CountryImage from "../pages/countries/CountryImage";
import CountryView from "../pages/countries/CountryView";
import Home from "../pages/Home";
import Loading from "../pages/Loading";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import DestinationForm from "../pages/destinations/DestinationForm";
import DestinationImage from "../pages/destinations/DestinationImage";
import DestinationEditForm from "../pages/destinations/DestinationEditForm";
import DestinationView from "../pages/destinations/DestinationView";
import TourPackages from "../pages/tourpackages/TourPackages";
import TourPackageForm from "../pages/tourpackages/TourPackageForm";
import TourPackageImage from "../pages/tourpackages/TourPackageImage";
import TourPackageEditForm from "../pages/tourpackages/TourPackageEditForm";
import TourPackageView from "../pages/tourpackages/TourPackageView";
import Tours from "../pages/tours/Tours";
import TourForm from "../pages/tours/TourForm";
import TourImage from "../pages/tours/TourImage";
import TourEditForm from "../pages/tours/TourEditForm";
import TourView from "../pages/tours/TourView";
import AccomPackages from "../pages/accompackages/AccomPackages";
import AccomPackageForm from "../pages/accompackages/AccomPackageForm";
import AccomPackageEditForm from "../pages/accompackages/AccomPackageEditForm";
import AccomPackageImage from "../pages/accompackages/AccomPackageImage";
import AccomPackageView from "../pages/accompackages/AccomPackageView";
import Accomodations from "../pages/accomodations/Accomodations";
import AccomodationForm from "../pages/accomodations/AccomodationForm";
import AccomodationImage from "../pages/accomodations/AccomodationImage";
import AccomodationEditForm from "../pages/accomodations/AccomodationEditForm";
import AccomodationView from "../pages/accomodations/AccomodationView";
import SiteInfo from "../pages/siteinfo/SiteInfo";
import SiteInfoForm from "../pages/siteinfo/SiteInfoForm";
import SiteInfoImage from "../pages/siteinfo/SiteInfoImage";
import Customers from "../pages/customers/Customers";
import CustomerForm from "../pages/customers/CustomerForm";
import CustomerView from "../pages/customers/CustomerView";
import Bookings from "../pages/bookings/Bookings";
import BookingView from "../pages/bookings/BookingView";
import SocialForm from "../pages/siteinfo/SocialForm";

const routes=[
    {
        path:'/signin',
        component: SignIn,
        isPrivate:false
    },
    
    {
        path:'/',
        component: Home,
        isPrivate:true,
        exact:true
    },
    {
        path:'/countries',
        component: Countries,
        isPrivate:true
    },
    {
        path:'/createCountry',
        component: CountryForm,
        isPrivate:true
    },
    {
        path:'/editCountry',
        component: CountryEditForm,
        isPrivate:true
    },
    {
        path:'/viewCountry',
        component: CountryView,
        isPrivate:true
    },
    {
        path:'/imageCountry',
        component: CountryImage,
        isPrivate:true
    },
    {
        path:'/destinations',
        component: Destinations,
        isPrivate:true
    },
    {
        path:'/createDestination',
        component: DestinationForm,
        isPrivate:true
    },
    {
        path:'/editDestination',
        component: DestinationEditForm,
        isPrivate:true
    },
    {
        path:'/viewDestination',
        component: DestinationView,
        isPrivate:true
    },
    {
        path:'/imageDestination',
        component: DestinationImage,
        isPrivate:true
    },
    {
        path:'/tourPackages',
        component: TourPackages,
        isPrivate:true
    },
    {
        path:'/createTourPackage',
        component: TourPackageForm,
        isPrivate:true
    },
    {
        path:'/editTourPackage',
        component: TourPackageEditForm,
        isPrivate:true
    },
    {
        path:'/imageTourPackage',
        component: TourPackageImage,
        isPrivate:true
    },
    {
        path:'/viewTourPackage',
        component: TourPackageView,
        isPrivate:true
    },
    {
        path:'/tours',
        component: Tours,
        isPrivate:true
    },
    {
        path:'/createTour',
        component: TourForm,
        isPrivate:true
    },
    {
        path:'/viewTour',
        component: TourView,
        isPrivate:true
    },
    {
        path:'/editTour',
        component: TourEditForm,
        isPrivate:true
    },
    {
        path:'/imageTour',
        component: TourImage,
        isPrivate:true
    },
    {
        path:'/accomPackages',
        component: AccomPackages,
        isPrivate:true
    },
    {
        path:'/createAccomPackage',
        component: AccomPackageForm,
        isPrivate:true
    },
    {
        path:'/editAccomPackage',
        component: AccomPackageEditForm,
        isPrivate:true
    },
    {
        path:'/imageAccomPackage',
        component: AccomPackageImage,
        isPrivate:true
    },
    {
        path:'/viewAccomPackage',
        component: AccomPackageView,
        isPrivate:true
    },
    {
        path:'/accomodations',
        component: Accomodations,
        isPrivate:true
    },
    {
        path:'/createAccomodation',
        component: AccomodationForm,
        isPrivate:true
    },
    {
        path:'/imageAccomodation',
        component: AccomodationImage,
        isPrivate:true
    },
    {
        path:'/editAccomodation',
        component: AccomodationEditForm,
        isPrivate:true
    },
    {
        path:'/viewAccomodation',
        component: AccomodationView,
        isPrivate:true
    },
    {
        path:'/customers',
        component:Customers,
        isPrivate:true
    },
    {
        path:'/createCustomer',
        component: CustomerForm,
        isPrivate:true
    },
    {
        path:'/viewCustomer',
        component: CustomerView,
        isPrivate:true
    },
    {
        path:'/bookings',
        component:Bookings,
        isPrivate:true
    },
    {
        path:'/viewBooking',
        component: BookingView,
        isPrivate:true
    },
    {
        path:'/siteInfo',
        component: SiteInfo,
        isPrivate:true
    },
    {
        path:'/editSiteInfo',
        component: SiteInfoForm,
        isPrivate:true
    },
    {
        path:'/imageSiteInfo',
        component: SiteInfoImage,
        isPrivate:true
    },
    {
        path:'/createSocial',
        component: SocialForm,
        isPrivate:true
    },
    {
        path:'/*',
        component:NotFound,
        isPrivate:true
    },
    
    
];

export default routes;