import pyodbc
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from cryptography.fernet import Fernet
from rest_framework import status
from django.contrib.auth import logout

def call_stored_procedure(proc_name, params):
    # Establish a connection to the SQL Server database
    conn_str = (
        "DRIVER={SQL Server Native Client 11.0};SERVER="
        + settings.DATABASES['default']['HOST'] +
        ";DATABASE=" + settings.DATABASES['default']['NAME'] +
        ";UID=" + settings.DATABASES['default']['USER'] +
        ";PWD=" + settings.DATABASES['default']['PASSWORD'] + ";"
    )
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()

    try:
        # Prepare the query to execute the stored procedure
        query_user = proc_name
        print(f"Executing stored procedure: {proc_name} with params: {params}")

        # Execute the stored procedure with parameters
        cursor.execute(query_user, params)

        # Fetch all rows of the results
        rows = cursor.fetchall()
        
        # Convert the Row objects to a list of dictionaries
        data = []
        if rows:
            columns = [column[0] for column in cursor.description]  # Get the column names
            for row in rows:
                user_data = dict(zip(columns, row))  # Create a dictionary from the row
                data.append(user_data)  # Append to the list of dictionaries
        
    except Exception as e:
        print("Error occurred:", str(e))
        data = None  # Set data to None if there's an error
    finally:
        cursor.close()
        conn.close()  # Ensure the connection is closed

    return data

# Decrypt and validate password function
def validate_password(enc_pwd, provided_pwd):
    try:
        # Your encryption key
        key = b'3aHX_C5RFg39Km3DhoHCObNIAsoQQ_6zDn7_9iTFksY='
        fernet = Fernet(key)
        
        # Decrypt the password
        decrypted_password = fernet.decrypt(enc_pwd.encode()).decode()
        print(decrypted_password)
        
        # Compare with the provided password
        if decrypted_password == provided_pwd:
            return True
        else:
            return False
    except Exception as e:
        print("Error during decryption:", str(e))
        return False

class UserAuthAPIView(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        password = request.query_params.get('password')
        # password encrypt
        
        
        # key = b'3aHX_C5RFg39Km3DhoHCObNIAsoQQ_6zDn7_9iTFksY='
        # fernet = Fernet(key)
        # encpsw = fernet.encrypt(password.encode())
        # print('Password', encpsw)
        
        #................
        print("Password for login:", password)

        if not username or not password:
            return Response({"error": "Missing username or password"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            proc_name = "EXEC usp_UsrAuth ?, ?, 0"
            params = [username, password]

            data = call_stored_procedure(proc_name, params)
            print(data)

            if data:
                user_data = data[0]

                # Extract encrypted password from the result
                encrypted_password = user_data.get('LogPwd')
                print(encrypted_password)

                # Validate the password
                if encrypted_password and validate_password(encrypted_password, password):
                    return Response({
                        "status": "success",
                        "username" : username,
                        "data": user_data  # Return the user data if password matches
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        "status": "failed",
                        "message": "Invalid username or password"
                    }, status=status.HTTP_401_UNAUTHORIZED)

            else:
                return Response({
                    "status": "failed",
                    "message": "User not found"
                }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print("Error occurred:", str(e))  
            return Response({
                "error": "An error occurred while processing your request."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          
class LogoutAPIView(APIView):
    def post(self, request):
        try:
            # Log the user out
            logout(request)

            return Response({
                "status": "success",
                "message": "User logged out successfully."
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("Error occurred during logout:", str(e))  
            return Response({
                "error": "An error occurred while processing your request."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                        
class BranchListAPIView(APIView):
    def get(self, request):
        # Get the authentication token or any other required parameters
        userid = request.query_params.get('userid')  # Example parameter for auth

        if not userid:
            return Response({"error": "Missing userid"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Define the stored procedure to list branches
            query_additional = "EXEC usp_UsrAuth '', '', ?"
            params = [userid]  # Modify as necessary to match your SP's expected parameters

            data = call_stored_procedure(query_additional, params)
            print(data)

            if data:
                return Response({
                    "status": "success",
                    "data": data  # Return the list of branches
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": "failed",
                    "message": "No branches found"
                }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print("Error occurred:", str(e))  
            return Response({
                "error": "An error occurred while processing your request."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MainNavAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')

        if not user_id:
            return Response({"error": "Missing user_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Define the stored procedure to access user data
            query_additional_menu = "EXEC usp_UsrAcs ?, 0"
            params = [user_id]

            # Call the stored procedure
            data = call_stored_procedure(query_additional_menu, params)
            print(data)

            if data:
                return Response({
                    "status": "success",
                    "data": data  # Return the user access data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": "failed",
                    "message": "No access data found for the user"
                }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print("Error occurred:", str(e))
            return Response({
                "error": "An error occurred while processing your request."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SubNavAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')
        mnu_id = request.query_params.get('mnu_id')

        if not user_id:
            return Response({"error": "Missing user_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Define the stored procedure to access user data
            query_additional_menu = "EXEC usp_UsrAcs ?, ?"
            params = [user_id,mnu_id]

            # Call the stored procedure
            data = call_stored_procedure(query_additional_menu, params)
            print(data)

            if data:
                return Response({
                    "status": "success",
                    "data": data  # Return the user access data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": "failed",
                    "message": "No access data found for the user"
                }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print("Error occurred:", str(e))
            return Response({
                "error": "An error occurred while processing your request."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)