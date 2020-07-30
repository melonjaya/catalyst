import commonFields from '../../../common_fields';

export default `
  enum CountryCodeType {
    Master
  }
  enum CountryCodeStatus {
    Draft
    Queue
    Processing
    Active
    Inactive
    Closed
  }
  
  type CountryCode {
    ${commonFields}
    
    officialName: String
    sovereignty: String
    alpha2Code: String
    alpha3Code: String
    numericCode: String
    ccTLD: String
                
    type: CountryCodeType
    status: CountryCodeStatus
  }
  
  input CountryCodeInput {
    _id: String!
    
    name: String
    officialName: String
    sovereignty: String
    alpha2Code: String
    alpha3Code: String
    numericCode: String
    ccTLD: String
    
    description: String
  }
`;
