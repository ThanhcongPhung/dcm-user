export const renderHighlightText = (slotsSelect = [], text) => {
  const newSlots = [...slotsSelect];
  newSlots.sort((a, b) => a.start - b.start);
  let start = 0;
  let textHtml = '';
  for (let i = 0; i < newSlots.length; i += 1) {
    textHtml += text.slice(start, newSlots[i].start);

    const newText = `<span style="background: #ECC94B;">${text.slice(
      newSlots[i].start,
      newSlots[i].end,
    )}</span>`;

    textHtml += newText;
    start = newSlots[i].end;
  }
  textHtml += text.slice(start, text.length);
  return textHtml;
};
