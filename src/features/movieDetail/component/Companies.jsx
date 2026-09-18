import '../styles/companies.css'
import { getCompanyLogoUrl } from '../../../utils/imageHelpers'

export default function Companies({ details }) {
  const companies = details?.production_companies || []

  return (
    <section className="companies">
      <h2>Production companies</h2>
      
      {companies.length ? (
        <div className="companies-list">
          {companies.map((company) => (
            <div className="company" key={company.id}>
              {company.logo_path ? (
                <img src={getCompanyLogoUrl(company.logo_path)} alt={company.name} />
              ) : (
                <span className="company-logo-placeholder" aria-hidden="true" />
              )}
              <span>{company.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="details-empty">No production company information is available.</p>
      )}
    </section>
  )
}
