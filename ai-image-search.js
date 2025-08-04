let mobilenetModel;

async function loadMobileNetModel() {
  mobilenetModel = await mobilenet.load();
  console.log("MobileNet model loaded");
}
function clearAiFilter() {
  // Show all products again
  renderProducts(allProducts);

  // Hide clear button
  document.getElementById("clearAiFilterBtn").style.display = "none";

  // Clear uploaded file input
  document.getElementById("imageUpload").value = "";
}

async function handleImageUpload() {
  const fileInput = document.getElementById("imageUpload");
  const file = fileInput.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.onload = async () => {
    const prediction = await mobilenetModel.classify(img);
    if (prediction && prediction.length > 0) {
  const label = prediction[0].className.toLowerCase();
  console.log("Predicted:", label);

  const words = label.split(" ");
  const matchedProducts = allProducts.filter(p =>
    words.some(word =>
      p.title.toLowerCase().includes(word) || p.description.toLowerCase().includes(word)
    )
  );

  if (matchedProducts.length > 0) {
    renderProducts(matchedProducts);
  } else {
    alert(`No products found for "${label}".`);
  }

  document.getElementById("clearAiFilterBtn").style.display = "inline-block";
}
  };
}

