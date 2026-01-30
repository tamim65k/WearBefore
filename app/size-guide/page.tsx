export default function SizeGuidePage() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Size Guide</h1>

            <div className="space-y-12">
                {/* Shirts Size Guide */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6">Shirts & Tops</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Size</th>
                                    <th className="px-4 py-3 text-left font-semibold">Chest (inches)</th>
                                    <th className="px-4 py-3 text-left font-semibold">Waist (inches)</th>
                                    <th className="px-4 py-3 text-left font-semibold">Length (inches)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr>
                                    <td className="px-4 py-3 font-medium">XS</td>
                                    <td className="px-4 py-3">32-34</td>
                                    <td className="px-4 py-3">26-28</td>
                                    <td className="px-4 py-3">27</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">S</td>
                                    <td className="px-4 py-3">35-37</td>
                                    <td className="px-4 py-3">29-31</td>
                                    <td className="px-4 py-3">28</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">M</td>
                                    <td className="px-4 py-3">38-40</td>
                                    <td className="px-4 py-3">32-34</td>
                                    <td className="px-4 py-3">29</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">L</td>
                                    <td className="px-4 py-3">41-43</td>
                                    <td className="px-4 py-3">35-37</td>
                                    <td className="px-4 py-3">30</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">XL</td>
                                    <td className="px-4 py-3">44-46</td>
                                    <td className="px-4 py-3">38-40</td>
                                    <td className="px-4 py-3">31</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">XXL</td>
                                    <td className="px-4 py-3">47-49</td>
                                    <td className="px-4 py-3">41-43</td>
                                    <td className="px-4 py-3">32</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pants Size Guide */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6">Pants & Jeans</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Waist Size</th>
                                    <th className="px-4 py-3 text-left font-semibold">Waist (inches)</th>
                                    <th className="px-4 py-3 text-left font-semibold">Hip (inches)</th>
                                    <th className="px-4 py-3 text-left font-semibold">Inseam (inches)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr>
                                    <td className="px-4 py-3 font-medium">28</td>
                                    <td className="px-4 py-3">28-29</td>
                                    <td className="px-4 py-3">34-35</td>
                                    <td className="px-4 py-3">30-32</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">30</td>
                                    <td className="px-4 py-3">30-31</td>
                                    <td className="px-4 py-3">36-37</td>
                                    <td className="px-4 py-3">30-32</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">32</td>
                                    <td className="px-4 py-3">32-33</td>
                                    <td className="px-4 py-3">38-39</td>
                                    <td className="px-4 py-3">30-34</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">34</td>
                                    <td className="px-4 py-3">34-35</td>
                                    <td className="px-4 py-3">40-41</td>
                                    <td className="px-4 py-3">30-34</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">36</td>
                                    <td className="px-4 py-3">36-37</td>
                                    <td className="px-4 py-3">42-43</td>
                                    <td className="px-4 py-3">30-34</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">38</td>
                                    <td className="px-4 py-3">38-39</td>
                                    <td className="px-4 py-3">44-45</td>
                                    <td className="px-4 py-3">30-34</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Shoes Size Guide */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6">Sneakers & Shoes</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">US Size</th>
                                    <th className="px-4 py-3 text-left font-semibold">UK Size</th>
                                    <th className="px-4 py-3 text-left font-semibold">EU Size</th>
                                    <th className="px-4 py-3 text-left font-semibold">Foot Length (cm)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr>
                                    <td className="px-4 py-3 font-medium">7</td>
                                    <td className="px-4 py-3">6</td>
                                    <td className="px-4 py-3">40</td>
                                    <td className="px-4 py-3">25</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">8</td>
                                    <td className="px-4 py-3">7</td>
                                    <td className="px-4 py-3">41</td>
                                    <td className="px-4 py-3">26</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">9</td>
                                    <td className="px-4 py-3">8</td>
                                    <td className="px-4 py-3">42</td>
                                    <td className="px-4 py-3">27</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">10</td>
                                    <td className="px-4 py-3">9</td>
                                    <td className="px-4 py-3">43</td>
                                    <td className="px-4 py-3">28</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">11</td>
                                    <td className="px-4 py-3">10</td>
                                    <td className="px-4 py-3">44</td>
                                    <td className="px-4 py-3">29</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">12</td>
                                    <td className="px-4 py-3">11</td>
                                    <td className="px-4 py-3">45</td>
                                    <td className="px-4 py-3">30</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* How to Measure */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">How to Measure</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-3">Chest</h3>
                            <p className="text-gray-600 text-sm">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Waist</h3>
                            <p className="text-gray-600 text-sm">Measure around your natural waistline, keeping the tape comfortably loose.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Hip</h3>
                            <p className="text-gray-600 text-sm">Measure around the fullest part of your hips, about 8 inches below your waist.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Inseam</h3>
                            <p className="text-gray-600 text-sm">Measure from the top of your inner thigh to the bottom of your ankle.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
