export const pageTours = {
  "/dashboard": [
    {
      selector: ".beginning",
      content: "Welcome to your dashboard. Let's guide you through it",
    },
    { selector: "#createButton", content: "Click to create new artwork" },
  ],
  "/dashboard/artworks/create": [
    {
      selector: "#illustration-form",
      content: (
        <div>
          <p>There are four steps available when creating an artwork:</p>
          <ol>
            <li>
              Fill the <strong>basic metadata</strong> information.
            </li>
            <li>
              Upload the <strong>images of the artwork</strong>.
            </li>
            <li>
              Fill in the <strong>pricing</strong> details (is the artwork for
              sale? If yes, specify the price) and enter the{" "}
              <strong>creation date</strong> of the artwork.
            </li>
            <li>
              Preview all the information you've entered before submitting.
            </li>
          </ol>
        </div>
      ),
    },
  ],
};
