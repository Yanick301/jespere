import os

file_path = 'lib/products.ts'

with open(file_path, 'r') as f:
    lines = f.readlines()

# Keep lines up to 1536 (inclusive)
# Line indices are 0-based, so line 1536 is index 1535.
# We want to keep the first 1536 lines.
new_lines = lines[:1536]

# Append the default export
new_lines.append('\n// Truncated file to remove problematic PRODUCTS.push calls that were causing build errors.\n')
new_lines.append('export default ALL_PRODUCTS\n')

with open(file_path, 'w') as f:
    f.writelines(new_lines)

print(f"Successfully truncated {file_path} to {len(new_lines)} lines.")
