
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAllItems, getUserItems, saveItem, markAsReturned, deleteItem } from "./firebaseauth.js";

const db = getFirestore();

const studentDatabase = [
    {enrollment: '231130146001', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146002', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146003', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146004', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146005', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146006', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146007', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146008', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146009', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146010', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146011', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146012', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146013', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146014', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146015', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146016', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146017', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146018', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146019', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146020', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146021', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146022', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146023', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146024', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146025', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146026', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146027', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146028', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146001', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146002', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146003', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146004', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146005', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146006', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146007', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146008', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146009', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146010', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146011', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146012', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146013', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146014', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146015', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146016', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146017', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146018', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146019', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146020', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146021', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146022', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146023', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146024', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146025', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146026', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146027', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146028', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'}
];
// PASTE THIS ENTIRE BLOCK at the top of app.js, below the studentDatabase

import { getAuth, onAuthStateChanged } from "./firebaseauth.js";
const auth = getAuth();

// This master listener controls the entire application flow
onAuthStateChanged(auth, async (user) => {
    if (user) { // User is logged in
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists() && docSnap.data().enrollmentId) {
            // User is enrolled, show the main app
            currentUser = { uid: user.uid, ...docSnap.data() };
            
            document.getElementById('enrollment-page').classList.add('hidden');
            document.getElementById('navbar').classList.remove('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            showPage('home');
            updateProfile();
        } else {
            // User is logged in but must enroll
            currentUser = { uid: user.uid, email: user.email, ...docSnap.data() };
            document.getElementById('enrollment-page').classList.remove('hidden');
            document.getElementById('navbar').classList.add('hidden');
            document.getElementById('main-content').classList.add('hidden');
        }
    } else { // User is logged out
        currentUser = null;
        localStorage.clear();
        if (!window.location.pathname.endsWith('index.html')) {
            window.location.href = 'index.html';
        }
    }
});
// ADD THIS BLOCK TO THE TOP OF app.js

// Add this debug function at the TOP of app.js
async function debugFirestoreItems() {
    try {
        const { getAllItemsFromFirestore } = await import("./firebaseauth.js");
        const allItems = await getAllItemsFromFirestore();
        
        console.log('🔍 ALL FIRESTORE ITEMS:');
        allItems.forEach(item => {
            console.log('📄 Item:', {
                id: item.id,
                name: item.name,
                type: item.type,
                status: item.status,
                userId: item.userId,
                reporter: item.reporter
            });
        });
        
        // Also show current user info
        console.log('👤 Current User:', currentUser);
        console.log('🔑 Logged in User ID:', localStorage.getItem('loggedInUserId'));
        
        return allItems;
    } catch (error) {
        console.error('❌ Debug error:', error);
    }
}

// Make it available globally
window.debugFirestoreItems = debugFirestoreItems;

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function checkEnrollmentEmailConflict(enrollmentId, userEmail) {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    
    if (storedEnrollments[enrollmentId] && storedEnrollments[enrollmentId] !== userEmail) {
        return {
            conflict: true,
            existingEmail: storedEnrollments[enrollmentId]
        };
    }
    
    if (storedEnrollments[enrollmentId] === userEmail) {
        return { conflict: false };
    }
    
    return { conflict: false };
}

function saveEnrollmentEmail(enrollmentId, userEmail) {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    storedEnrollments[enrollmentId] = userEmail;
    localStorage.setItem('enrollmentEmails', JSON.stringify(storedEnrollments));
}


function verifyEnrollment(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const enrollmentId = formData.get('enrollmentId');
    const studentName = formData.get('studentName');

    const studentRecord = studentDatabase.find(student => student.enrollment === enrollmentId);
    
    if (studentRecord) {
        document.getElementById('branch').value = studentRecord.branch;
        document.getElementById('college').value = studentRecord.college;
        document.getElementById('semester').value = studentRecord.sem;
        
        const userEmail = localStorage.getItem('currentUserEmail');
        
        if (!userEmail) {
            alert('Error: User email not found. Please sign in again.');
            return;
        }
        
        window.tempUserEmail = userEmail;
        
        document.getElementById('verifyBtn').classList.add('hidden');
        document.getElementById('verificationButtons').classList.remove('hidden');
        
        window.tempUserData = {
            enrollmentId,
            name: studentName,
            branch: studentRecord.branch,
            college: studentRecord.college,
            semester: studentRecord.sem,
            email: userEmail
        };
    } else {
        alert('Enrollment ID not found. Please contact the administrator.');
    }
}
// REPLACE your existing confirmDetails function with this one

async function confirmDetails(isCorrect) {
    if (isCorrect) {
        const userId = localStorage.getItem('loggedInUserId');
        if (!userId) {
            alert("Critical Error: User ID not found. Please log in again.");
            logout();
            return;
        }

        try {
            // Show a loading state on the button
            const verifyButton = document.querySelector('#verificationButtons button:first-child');
            verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
            verifyButton.disabled = true;
            document.querySelector('#verificationButtons button:last-child').disabled = true;

            // Prepare user data from the temporary object created during verification
            const userDataToSave = {
                enrollmentId: window.tempUserData.enrollmentId,
                firstName: window.tempUserData.name, // Ensure 'name' is used for consistency
                branch: window.tempUserData.branch,
                college: window.tempUserData.college,
                semester: window.tempUserData.semester,
                lastUpdated: new Date().toISOString()
            };

            // Save the enrollment data to Firestore
            const db = getFirestore();
            const userDocRef = doc(db, "users", userId);
            await setDoc(userDocRef, userDataToSave, { merge: true });

            // Also update the local enrollment-email mapping
            saveEnrollmentEmail(window.tempUserData.enrollmentId, window.tempUserData.email);

            // SUCCESS! Now, reload the page.
            // This is the CRITICAL fix. Reloading forces onAuthStateChanged to run again.
            // This time, it will find the enrollmentId in your user document and load the
            // full application correctly from the start.
            window.location.reload();

        } catch (error) {
            console.error("Failed to save enrollment details:", error);
            alert("Error saving your details. Please try again. Error: " + error.message);
            // Re-enable buttons if saving fails
            const verifyButton = document.querySelector('#verificationButtons button:first-child');
            verifyButton.innerHTML = '<i class="fas fa-check mr-2"></i>Yes, these are my details';
            verifyButton.disabled = false;
            document.querySelector('#verificationButtons button:last-child').disabled = false;
        }

    } else {
        alert('Please contact:\nHOD: hod.cse@salcollege.edu\nCoordinator: coordinator.cse@salcollege.edu\nPhone: +91-XXXXXXXXXX');
    }
}
// REPLACE your old function with this one
async function updateUserDataInFirestore() {
    try {
        const userId = localStorage.getItem('loggedInUserId');
        
        if (userId && currentUser) {
            const userDocRef = doc(db, "users", userId); // This now uses the 'db' connection from the top of the file
            await setDoc(userDocRef, {
                email: currentUser.email,
                firstName: currentUser.name,
                enrollmentId: currentUser.enrollmentId,
                branch: currentUser.branch,
                college: currentUser.college,
                semester: currentUser.semester,
                lastUpdated: new Date().toISOString()
            }, { merge: true });
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

function showEmailConflictModal(existingEmail) {
    document.getElementById('existingEmail').textContent = existingEmail;
    document.getElementById('emailConflictModal').classList.remove('hidden');
    document.getElementById('emailConflictModal').classList.add('flex');
}

function closeEmailConflictModal() {
    document.getElementById('emailConflictModal').classList.add('hidden');
    document.getElementById('emailConflictModal').classList.remove('flex');
    document.getElementById('enrollmentForm').reset();
    document.getElementById('verifyBtn').classList.remove('hidden');
    document.getElementById('verificationButtons').classList.add('hidden');
}

function redirectToLogin() {
    closeEmailConflictModal();
    logout();
}

// REPLACE your existing showPage function with this one in app.js

function showPage(pageId) {
    // Hide all main pages first
    const pages = ['home-page', 'report-found-page', 'report-lost-page', 'search-page', 'profile-page'];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });

    // Show the target page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Close the profile dropdown menu if it's open
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.classList.add('hidden');
    }

    // --- THIS IS THE CRITICAL FIX ---
    // Always fetch fresh data when navigating to a specific page
    if (pageId === 'home') {
        updateStatistics();
    } else if (pageId === 'search') {
        searchItems();
    } else if (pageId === 'profile') {
        loadUserItems(); // This ensures the item list is always fresh
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function updateProfile() {
    if (currentUser) {
        const profileName = document.getElementById('profileName');
        const profileEnrollment = document.getElementById('profileEnrollment');
        const profileDepartment = document.getElementById('profileDepartment');
        
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEnrollment) profileEnrollment.textContent = `Enrollment ID: ${currentUser.enrollmentId}`;
        if (profileDepartment) profileDepartment.textContent = `Branch: ${currentUser.branch} | Semester: ${currentUser.semester}`;
        
        loadUserItems();
    }
}
async function updateStatistics() {
    try {
        const allItems = await getAllItems(); // Use the new getAllItems function
        
        const totalSubmissions = allItems.length;
        const totalFound = allItems.filter(item => item.type === 'found').length;
        const totalLost = allItems.filter(item => item.type === 'lost').length;
        const totalReturned = allItems.filter(item => item.status === 'returned').length;
        
        const totalSubmissionsEl = document.getElementById('totalSubmissions');
        const totalFoundEl = document.getElementById('totalFound');
        const totalLostEl = document.getElementById('totalLost');
        const totalReturnedEl = document.getElementById('totalReturned');
        
        if (totalSubmissionsEl) totalSubmissionsEl.textContent = totalSubmissions;
        if (totalFoundEl) totalFoundEl.textContent = totalFound;
        if (totalLostEl) totalLostEl.textContent = totalLost;
        if (totalReturnedEl) totalReturnedEl.textContent = totalReturned;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}
function previewImage(input, previewId) {
    const file = input.files[0];
    const preview = document.getElementById(previewId);
    
    if (!file) return;

    // Size check
    if (file.size > 5 * 1024 * 1024) {
        alert('Image too large! Please use images smaller than 5MB.');
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        // Store base64 data directly on the input
        input._base64Data = e.target.result;
        
        // Update preview
        const img = preview.querySelector('img');
        if (img) {
            img.src = e.target.result;
        }
        preview.classList.remove('hidden');
        
        // Hide placeholder
        const placeholder = document.getElementById(input.id + 'Placeholder');
        if (placeholder) {
            placeholder.classList.add('hidden');
        }
    };
    reader.onerror = function() {
        alert('Error loading image. Please try a different image.');
        input.value = '';
    };
    reader.readAsDataURL(file);
}
// REPLACE your old removeImage function with this one
function removeImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (input) {
        input.value = '';
        if (input._base64Data) {
            input._base64Data = null;
        }
    }
    
    if (preview) {
        preview.classList.add('hidden');
    }
    
    // Safely find and show the correct placeholder
    let placeholderId = '';
    if (inputId === 'foundItemImage') {
        placeholderId = 'foundImagePlaceholder';
    } else if (inputId === 'lostItemImage') {
        placeholderId = 'lostImagePlaceholder';
    }

    if (placeholderId) {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            placeholder.classList.remove('hidden');
        } else {
            console.warn(`Warning: Placeholder element with ID '${placeholderId}' not found.`);
        }
    }
}
async function submitFoundItem(event) {
    event.preventDefault();
    const user = getAuth().currentUser;
    if (!user) {
        showErrorModal('You must be logged in to report an item.');
        return;
    }

    const formData = new FormData(event.target);
    const imageInput = document.getElementById('foundItemImage');

    const item = {
        id: Date.now().toString(),
        type: 'found',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateFound'),
        contact: formData.get('contactInfo'),
        imageBase64: imageInput?._base64Data || null,
        userId: user.uid,
        reporter: currentUser?.name || 'User',
        reporterId: currentUser?.enrollmentId || 'N/A',
        status: 'active',
        createdAt: new Date().toISOString() // Include creation timestamp
    };

    try {
        await saveItem(item); // Use the new saveItem function
        showSuccessModal('Found item reported successfully!');
        updateStatistics();
        event.target.reset();
        removeImage('foundItemImage', 'foundImagePreview');
    } catch (error) {
        showErrorModal('Error saving item: ' + error.message);
    }
}
async function submitLostItem(event) {
    event.preventDefault();
    const user = getAuth().currentUser;
    if (!user) {
        showErrorModal('You must be logged in to report an item.');
        return;
    }

    const formData = new FormData(event.target);
    const imageInput = document.getElementById('lostItemImage');
    
    const item = {
        id: Date.now().toString(),
        type: 'lost',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateLost'),
        contact: formData.get('contactInfo'),
        imageBase64: imageInput?._base64Data || null,
        userId: user.uid,
        reporter: currentUser?.name || 'User',
        reporterId: currentUser?.enrollmentId || 'N/A',
        status: 'active',
        createdAt: new Date().toISOString() // Include creation timestamp
    };

    try {
        await saveItem(item); // Use the new saveItem function
        showSuccessModal('Lost item reported successfully!');
        updateStatistics();
        event.target.reset();
        removeImage('lostItemImage', 'lostImagePreview');
    } catch (error) {
        showErrorModal('Error saving item: ' + error.message);
    }
}
function debugAuth() {
    console.log('🔐 AUTH DEBUG INFO:');
    console.log('LoggedInUserId:', localStorage.getItem('loggedInUserId'));
    console.log('CurrentUserEmail:', localStorage.getItem('currentUserEmail'));
    console.log('CurrentUser:', currentUser);
    console.log('Firebase App:', typeof firebase !== 'undefined' ? 'Loaded' : 'Not Loaded');
}

// Call this in your browser console to check status
window.debugAuth = debugAuth;
async function searchItems() {
    const query = document.getElementById('searchQuery')?.value.toLowerCase() || '';
    const category = document.getElementById('searchCategory')?.value || '';
    const type = document.getElementById('searchType')?.value || '';
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i><p class="text-gray-600 mt-2">Loading...</p></div>';
    }
    try {
        let allItems = await getAllItems(); // Use the new getAllItems function

        if (query) {
            allItems = allItems.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );
        }

        if (category) {
            allItems = allItems.filter(item => item.category === category);
        }

        if (type) {
            allItems = allItems.filter(item => item.type === type);
        }

        displaySearchResults(allItems, query);
    } catch (error) {
        console.error('Error fetching items:', error);
        displaySearchResults([], query);
    }
}

function displaySearchResults(items, query = '') {
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (items.length === 0) {
        resultsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No items found matching your search criteria.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = items.map(item => `
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-sm font-medium ${
                    item.type === 'found' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }">
                    ${item.type === 'found' ? 'Found' : 'Lost'}
                </span>
                <span class="text-sm text-gray-500">${item.category}</span>
            </div>
            
            <div class="mb-4">
                ${item.imageBase64 ? 
    `<img src="${item.imageBase64}" alt="${item.name}" 
          class="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer"
          onclick="openImageModal('${item.imageBase64}')">` :
    `<div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
        <i class="fas fa-image text-4xl text-gray-400"></i>
    </div>`
}
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-2">${highlightText(item.name, query)}</h3>
            <p class="text-gray-600 mb-4">${highlightText(item.description, query)}</p>
            
            <div class="space-y-2 text-sm text-gray-500">
                <div><i class="fas fa-user mr-2"></i><strong>Uploaded by:</strong> ${item.reporter}</div>
                <div><i class="fas fa-id-card mr-2"></i><strong>Enrollment:</strong> ${item.reporterId}</div>
                <div><i class="fas fa-map-marker-alt mr-2"></i><strong>Location:</strong> ${item.location}</div>
                <div><i class="fas fa-calendar mr-2"></i><strong>Date:</strong> ${new Date(item.date).toLocaleDateString()}</div>
            </div>
            
            <button onclick="contactReporter('${item.contact}')" 
                    class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-envelope mr-2"></i>Contact Reporter
            </button>
        </div>
    `).join('');
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}
async function loadUserItems() {
    if (!currentUser) return;
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) return;

    try {
        const userItems = await getUserItems(userId); // Use the new getUserItems function
        
        const container = document.getElementById('userItems');
        if (!container) return;
        
        const activeItems = userItems.filter(item => item.status !== 'archived');
        
        if (activeItems.length === 0) {
            container.innerHTML = `<div class="text-center py-8"><i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i><p class="text-gray-600">You haven't reported any items yet.</p></div>`;
        } else {
            container.innerHTML = activeItems.map(item => `
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200" data-item-id="${item.id}">
                    <div class="flex items-center justify-between mb-2">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${item.type === 'found' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${item.type === 'found' ? 'Found' : 'Lost'}</span>
                        <div class="flex space-x-2">
                            ${item.status !== 'returned' ? `<button onclick="markAsReturned('${item.id}')" class="text-green-600 hover:text-green-800 transition-colors p-2 rounded-full hover:bg-green-50" title="Mark as Returned"><i class="fas fa-check-circle"></i></button>` : ''}
                            <button onclick="deleteUserItem('${item.id}')" class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-50" title="Delete Item"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <div class="mb-3">
                        ${item.imageBase64 ? `<img src="${item.imageBase64}" alt="${item.name}" class="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer" onclick="openImageModal('${item.imageBase64}')">` : `<div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2"><i class="fas fa-image text-4xl text-gray-400"></i></div>`}
                    </div>
                    <h4 class="font-semibold text-gray-800 text-lg">${item.name}</h4>
                    <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                    <div class="text-xs text-gray-500 flex justify-between">
                        <span><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</span>
                        <span><i class="fas fa-calendar mr-1"></i>${new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    ${item.status === 'returned' ? `<div class="mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded text-center"><i class="fas fa-check mr-1"></i>Returned on ${new Date(item.returnedDate).toLocaleDateString()}</div>` : ''}
                </div>
            `).join('');
        }
        
        const returnedItems = userItems.filter(item => item.status === 'returned');
        const historyContainer = document.getElementById('userHistory');
        
        if (historyContainer) {
            if (returnedItems.length === 0) {
                historyContainer.innerHTML = `<div class="text-center py-8"><i class="fas fa-history text-4xl text-gray-400 mb-4"></i><p class="text-gray-600">No returned items in history yet.</p></div>`;
            } else {
                historyContainer.innerHTML = returnedItems.map(item => `
                    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div class="flex justify-between items-center mb-2">
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">${item.type === 'found' ? 'Found' : 'Lost'} - Returned</span>
                            <span class="text-xs text-gray-500">Returned: ${new Date(item.returnedDate).toLocaleDateString()}</span>
                        </div>
                        <div class="mb-3">
                            ${item.imageBase64 ? `<img src="${item.imageBase64}" alt="${item.name}" class="w-full h-32 object-cover rounded-lg mb-2">` : `<div class="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2"><i class="fas fa-image text-2xl text-gray-400"></i></div>`}
                        </div>
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                        <div class="text-xs text-gray-500 flex justify-between">
                            <span><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</span>
                            <span><i class="fas fa-calendar mr-1"></i>${new Date(item.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                `).join('');
            }
        }
        
    } catch (error) {
        console.error('❌ Error loading user items:', error);
    }
}

async function debugFirestoreItems() {
    try {
        const { getAllItemsFromFirestore } = await import("./firebaseauth.js");
        const allItems = await getAllItemsFromFirestore();
        
        console.log('🔍 ALL FIRESTORE ITEMS:');
        allItems.forEach(item => {
            console.log('📄 Item:', {
                id: item.id,
                name: item.name,
                type: item.type,
                status: item.status,
                userId: item.userId
            });
        });
        
        return allItems;
    } catch (error) {
        console.error('❌ Debug error:', error);
    }
}

// Call this in browser console to see all items
window.debugFirestoreItems = debugFirestoreItems;
function openImageModal(imageData) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="max-w-4xl max-h-full p-4">
            <div class="bg-white rounded-lg p-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Item Image</h3>
                    <button onclick="this.closest('.fixed').remove()" 
                            class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <img src="${imageData}" alt="Item Image" class="max-w-full max-h-96 object-contain rounded">
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function contactReporter(contact) {
    alert(`Contact the reporter at: ${contact}`);
}

function showSuccessModal(message) {
    const successMessage = document.getElementById('successMessage');
    const successModal = document.getElementById('successModal');
    
    if (successMessage) successMessage.textContent = message;
    if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    }
}

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

async function logout() {
    const auth = getAuth();

    try {
        await signOut(auth); // ✅ Properly sign out of Firebase session
        localStorage.clear(); // ✅ Clear all local data
        sessionStorage.clear();
        console.log("✅ Logged out successfully");
    } catch (error) {
        console.error("❌ Logout error:", error);
    } finally {
        // Redirect back to sign-in page
        window.location.href = "index.html";
    }
}
async function markAsReturned(itemId) {
    if (!confirm("Mark this item as returned?")) {
        return; 
    }

    try {
        await markAsReturned(itemId); // Call the new function from firebaseauth.js
        showSuccessModal('Item has been marked as returned!');
        await loadUserItems(); 
        
    } catch (error) {
        console.error('Error marking as returned:', error);
        showErrorModal('Failed to update the item. Please try again.'); 
    }
}
async function deleteItem(itemId) {
    try {
        const db = getFirestore();
        const itemRef = doc(db, "lostFoundItems", itemId);
        const docSnap = await getDoc(itemRef);
        if (!docSnap.exists()) {
            console.error(`❌ Item ${itemId} does not exist in Firestore`);
            showSuccessModal(`Error: Item with ID ${itemId} not found.`);
            return;
        }
        console.log(`✅ Attempting to soft delete item ${itemId}`);
        await softDeleteItemInFirestore(itemId);
        showSuccessModal('Item deleted successfully!');
        loadUserItems();
    } catch (error) {
        console.error('❌ Error deleting item:', error);
        showSuccessModal(`Error deleting item: ${error.message}`);
    }
}
// Renamed from softDeleteItem to reflect that it now performs a hard delete.
async function deleteUserItem(itemId) {
    if (!confirm("Are you sure you want to permanently delete this item? This action cannot be undone.")) {
        return;
    }
    
    try {
        await deleteItem(itemId); // Call the new hard delete function
        showSuccessModal('Item deleted successfully!');
        await loadUserItems();
        
    } catch (error) {
        console.error('Error deleting item:', error);
        showErrorModal('Failed to delete the item. Please try again.');
    }
}
// Make sure to make this function available to the window if it isn't already
window.deleteUserItem = deleteUserItem;
window.markAsReturned = markAsReturned;

// IMPORTANT: Find the old 'softDeleteItem' function and DELETE it to avoid confusion.
async function reportItem(type) {
    try {
        const name = document.getElementById(`itemName-${type}`)?.value;
        const description = document.getElementById(`itemDescription-${type}`)?.value;
        const location = document.getElementById(`itemLocation-${type}`)?.value;
        const contact = document.getElementById(`itemContact-${type}`)?.value;
        const imageFile = document.getElementById(`itemImage-${type}`)?.files[0];

        if (!name || !description || !location || !contact) {
            showSuccessModal('Please fill in all required fields.');
            return;
        }

        let imageBase64 = '';
        if (imageFile) {
            imageBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(imageFile);
            });
        }

        const item = {
            id: Date.now().toString(), // Ensure unique ID
            name,
            description,
            location,
            contact,
            type,
            userId: localStorage.getItem('loggedInUserId'),
            reporter: localStorage.getItem('currentUserEmail'),
            status: 'active',
            reporterId: currentUser?.enrollmentId || '',
            imageBase64,
            date: new Date().toISOString()
        };

        console.log(`✅ Reporting item with ID: ${item.id}`);
        await saveItemToFirestore(item);
        showSuccessModal(`Item ${type} reported successfully!`);
        showPage('profile');
    } catch (error) {
        console.error('❌ Error reporting item:', error);
        showSuccessModal(`Error reporting item: ${error.message}`);
    }
}
async function debugSubmission() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('🔍 DEBUG SUBMISSION:');
    console.log('Current User:', user);
    console.log('Local Storage User ID:', localStorage.getItem('loggedInUserId'));
    console.log('Current User Data:', currentUser);
    
    // Test Firestore connection
    const { getAllItemsFromFirestore } = await import("./firebaseauth.js");
    const items = await getAllItemsFromFirestore();
    console.log('Total items in Firestore:', items.length);
}

// Call this in browser console to check status
window.debugSubmission = debugSubmission;

async function debugItemIds() {
    try {
        const { getAllItemsFromFirestore } = await import("./firebaseauth.js");
        const allItems = await getAllItemsFromFirestore();
        
        console.log('🔍 ALL ITEM IDs IN DATABASE:');
        allItems.forEach(item => {
            console.log('📄 Item:', {
                id: item.id,
                name: item.name,
                type: item.type,
                status: item.status
            });
        });
        
        // Also check what IDs are in the current user's profile
        const userItemsContainer = document.getElementById('userItems');
        if (userItemsContainer) {
            const itemElements = userItemsContainer.querySelectorAll('[data-item-id]');
            console.log('🖥️ ITEM IDs IN UI:');
            itemElements.forEach(el => {
                console.log('UI Item ID:', el.getAttribute('data-item-id'));
            });
        }
        
    } catch (error) {
        console.error('❌ Debug error:', error);
    }
}

// Call this in browser console
window.debugItemIds = debugItemIds;