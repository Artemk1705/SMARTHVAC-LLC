export default function Disclamer() {
  return (
    <div className="disclamer_block">
      <h2 className="disclamer_title">Discount Details</h2>
      <p className="sidebar_text">
        We are excited to offer a special 10% discount on our services, up to a
        maximum amount of $200. Please note the following terms and conditions:
      </p>
      <ul className="sidebar_list">
        <li className="sidebar_list_item">
          The maximum discount amount is $200.
        </li>
        <li className="sidebar_list_item">
          This discount can be used only once per household.
        </li>
        <li className="sidebar_list_item">
          The discount is applicable to new customers only.
        </li>
        <li className="sidebar_list_item">
          The discount cannot be combined with other offers or promotions.
        </li>
        <li className="sidebar_list_item">
          The discount is not applicable to previous purchases or ongoing
          services.
        </li>
        <li className="sidebar_list_item">
          The discount must be mentioned at the time of booking and is subject
          to verification.
        </li>
        <li className="sidebar_list_item">
          Additional terms and conditions may apply. Please contact us for
          further details.
        </li>
      </ul>
    </div>
  );
}
