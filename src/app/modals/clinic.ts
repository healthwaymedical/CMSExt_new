export class Clinic {
    id: string;
    name: string;
    groupName: string;
    address: Address;
    faxNumber: string;
    contactNumber: string;
    clinicCode: string;
    attendingDoctorId: string[];
    clinicStaffUsernames: string[];
    companyRegistrationNumber: string;
    gstRegistrationNumber: string;
    heCode: string;
    clinicLogo: string;
    pcnRegistered: boolean;
    clinicFeatures: string[];
    status?: string;
  
    constructor(
      id?: string,
      name?: string,
      groupName?: string,
      address?: Address,
      faxNumber?: string,
      contactNumber?: string,
      clinicLogo?: string,
      clinicCode?: string,
      attendingDoctorId?: string[],
      clinicStaffUsernames?: string[],
      companyRegistrationNumber?: string,
      gstRegistrationNumber?: string,
      heCode?: string,
      pcnRegistered?: boolean,
      clinicFeatures?: string[],
      status?: string
    ) {
      this.id = id || '';
      this.name = name || '';
      this.groupName = groupName || '';
      this.address = address === undefined ? new Address() : address;
      this.faxNumber = faxNumber || '';
      this.contactNumber = contactNumber || '';
      this.clinicLogo = clinicLogo || '';
      this.clinicCode = clinicCode || '';
      this.attendingDoctorId =
        attendingDoctorId === undefined ? new Array<string>() : attendingDoctorId;
      this.clinicStaffUsernames =
        clinicStaffUsernames === undefined
          ? new Array<string>()
          : clinicStaffUsernames;
      this.companyRegistrationNumber = companyRegistrationNumber || '';
      this.gstRegistrationNumber = gstRegistrationNumber || '';
      this.heCode = heCode;
      this.pcnRegistered = pcnRegistered;
      this.clinicFeatures =
        clinicFeatures === undefined ? new Array<string>() : clinicFeatures;
      this.status = status || '';
    }
  }
  
  class Address {
    address: string;
    postalCode: string;
  
    constructor(address?: string, postalCode?: string) {
      this.address = address || '';
      this.postalCode = postalCode || '';
    }
  }
  