

export default function Settings() {
  return (
    <div className="theme-setting-wrapper">
      <div id="theme-settings" className="settings-panel">
        <i className="settings-close mdi mdi-close" />
        <div className="d-flex align-items-center justify-content-between border-bottom">
          <p className="settings-heading font-weight-bold border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
            Template Skins
          </p>
        </div>
        <div className="sidebar-bg-options" id="sidebar-light-theme">
          <div className="img-ss rounded-circle bg-light border mr-3" />
          Light
        </div>
        <div className="sidebar-bg-options selected" id="sidebar-dark-theme">
          <div className="img-ss rounded-circle bg-dark border mr-3" />
          Dark
        </div>
        <p className="settings-heading font-weight-bold mt-2">Header Skins</p>
        <div className="color-tiles mx-0 px-4">
          <div className="tiles primary" />
          <div className="tiles success" />
          <div className="tiles warning" />
          <div className="tiles danger" />
          <div className="tiles pink" />
          <div className="tiles info" />
          <div className="tiles dark" />
          <div className="tiles default" />
        </div>
      </div>
    </div>
  );
}
